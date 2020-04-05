export const resolvers = {
  Query: {
    products: (root: any, args: any, ctx: any) => {
      return ctx.Models.Product.getAllProducts()
    },
    getProduct: (root: any, { ASIN }: { ASIN: string} , ctx: any) => {
      return ctx.Models.Product.getProduct(ASIN)
    }
  }
}
