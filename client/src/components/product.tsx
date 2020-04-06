import React from 'react'
import styled from 'react-emotion'

import * as ProductTypes from '../queries/__generated__/Products'

interface ProductProps {
  product: ProductTypes.Products_products
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return(
  <tr>
    <StyledData>{product.ASIN}</StyledData>
    <StyledData>{product.category}</StyledData>
    <StyledData>{product.rank}</StyledData>
    <StyledData>{product.dimensions}</StyledData>
  </tr>)
}

const StyledData = styled('td')`
  padding-right: 10px;
  white-space: nowrap;
`

export default Product