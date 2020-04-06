import React, { Fragment } from 'react'
import * as GetProductsTypes from '../queries/__generated__/Products'
import PRODUCTS_QUERY from '../queries/getProducts'
import { RouteComponentProps } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'
import { Product, ProductTableHeader, Loading } from '../components'

interface ProductsProps extends RouteComponentProps {}

const Products: React.FC<ProductsProps> = () => {
  const {
    data,
    loading,
    error,
  } = useQuery<GetProductsTypes.Products>(PRODUCTS_QUERY)

  if (loading) return <Loading/>
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return(
    <div>
      <a href="/">Go to product search by ASIN</a>
      <Fragment>
        <table>
          <ProductTableHeader />
          <tbody>
            { data.products &&
                data.products.map((product: any) => (
                  <Product key={product.ASIN} product={product}/>
                ))}
          </tbody>
        </table>
     </Fragment>
    </div>

  )
}

export default Products