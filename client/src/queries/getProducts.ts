import gql  from 'graphql-tag'

export default gql`
  query Products {
    products {
      ASIN
      category
      rank
      dimensions
    }
  }
`