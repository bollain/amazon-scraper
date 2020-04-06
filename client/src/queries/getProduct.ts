import gql  from 'graphql-tag'

export default gql`
  query GetProduct($asin: String!) {
    getProduct(ASIN: $asin) {
      ASIN
      category
      rank
      dimensions
    }
  }
`