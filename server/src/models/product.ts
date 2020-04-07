const  Xray = require('x-ray')
const x = Xray()
import { Sequelize, Model, DataTypes } from 'sequelize';

interface IProduct {
  id?: number
  ASIN: string
  category?: string
  dimensions?: string
  rank?: string
}

interface IScrapeResult {
  rank: string
  category: string
  content: string[]
  title: string
}

export default class Product extends Model<IProduct> {
  public id!: number
  public ASIN!: string
  public dimensions?: string
  public rank?: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async getProduct(ASIN: string) {
    const existingProduct = await Product.findOne({ where: { ASIN }})

    if (!existingProduct) {
      const scrapedProduct = await this.scrapeProductContent(ASIN)
      await Product.create(scrapedProduct)
      return scrapedProduct
    }

    return existingProduct
  }

  getAllProducts() {
    return Product.findAll();
  }

  private scrapeProductContent(ASIN: string): Promise<IProduct> {
    return new Promise((resolve, reject) => {
      x(`https://www.amazon.ca/dp/${ASIN}`, {
        rank: '#SalesRank',
        category: '.nav-a-content',
        content: x('.content ul', ['li']),
        title: 'title'
      })((err: any, result: IScrapeResult) => {
        if (err) reject(err)
        if (this.doesProductExist(result.title)) {
          const product = this.parseProductContent(ASIN, result)
          resolve(product)
        } else {
          reject("Product does not exist")
        }
      })
    })
  }

  private doesProductExist(title: string): boolean {
    return !title.toLowerCase().includes('not found')
  }

  private parseProductContent(ASIN: string, result: IScrapeResult): IProduct {
    const product: IProduct = {
      ASIN,
      category: result.category ? this.sanitizeCategory(result.category) : 'uncat',
      rank: result.rank ? this.sanitizeRank(result.rank) : 'unranked'
    }
  
    result.content.forEach(line => {
      line = line.toLowerCase()
      if (line.includes('dimensions')) {
        product.dimensions = this.sanitizeDimensions(line)
      }
    })
  
    return product
  }

  private sanitizeDimensions(rawDimensions: string): string {
    let result = rawDimensions.replace(/(\r\n|\n|\r)/gm, "")
    const indexOfColon = result.indexOf(':')
    return result.substr(indexOfColon + 1).trim()
  }

  private sanitizeCategory(rawCategory: string):string {
    return rawCategory
      .replace(/(\r\n|\n|\r)/gm, "")// Remove line breaks
      .trim()
  }

  private sanitizeRank(rawRank: string) {
    let rankArray = rawRank.split('\n')
    // Usually there is more than one rank (e.g. second rank is for a more narrow category)
    // However, the first rank will take precedence
    let rank = rankArray.find(element => element.includes('#'))
    // Remove the hyperlink that usually always follows rank
    const startOfHyperlink = rank?.indexOf('(')
    return rank?.substr(0, startOfHyperlink);
  }
}

const sequelize = new Sequelize('jungle', 'root', undefined, {
  host: 'localhost',
  dialect: 'mariadb'
});

Product.init(
  {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  ASIN: {
    type: new DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: new DataTypes.STRING,
    allowNull: true
  },
  dimensions: {
    type: new DataTypes.STRING,
    allowNull: true
  },
  rank: {
    type: new DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'products',
  sequelize: sequelize
})