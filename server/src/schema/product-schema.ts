const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    ASIN: String
    category: String
    rank: String
    dimensions: String
  }

  type Query {
    getProduct(ASIN: String!): Product
    products: [Product]
  }
`;

export default typeDefs;