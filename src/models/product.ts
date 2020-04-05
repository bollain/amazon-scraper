const  Xray = require('x-ray')
const x = Xray()

interface IProduct {
  ASIN: string
  category?: string
  dimensions?: string
  rank?: string
}

interface IScrapeResult {
  rank: string
  category: string
  content: string[]
}

export default class Product {
  async getProduct(ASIN: string) {
    const prod = await this.scrapeProductContent(ASIN)
    console.log(prod)

    return {
      ASIN: "B00CH9QWOU",
      category: "Home",
      dimensions: "30.5 x 27.9 x 34.3 cm",
      rank: "#690 in Home"
    }
  }

  getAllProducts() {
    return products
  }

  private scrapeProductContent(ASIN: string) {
    return new Promise((resolve, reject) => {
      x(`https://www.amazon.ca/dp/${ASIN}`, {
        rank: '#SalesRank',
        category: '.nav-a-content',
        content: x('.content ul', ['li'])
      })((err: any, result: IScrapeResult) => {
        if (err) reject(err)
        // console.log(result.category)
        console.log(result)
        const product = this.parseProductContent(ASIN, result)
        resolve(product)
      })
    })
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
    return rankArray.find(element => element.includes('#'))
  }
}

const products = [
  {
    ASIN: "B07X2SMSDR",
    category: "Beauty",
    dimensions: "25.2 x 17.4 x 4.4 cm ; 830 g",
    rank: "#3,235 in Beauty & Personal Care"
  },
  {
    ASIN: "B00CH9QWOU",
    category: "Home",
    dimensions: "30.5 x 27.9 x 34.3 cm",
    rank: "#690 in Home"
  },
]