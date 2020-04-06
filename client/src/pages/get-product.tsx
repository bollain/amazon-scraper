import React, { useState, FormEvent } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import PRODUCT_QUERY from '../queries/getProduct'
// import * as ProductTypes from '../queries/__generated__/Products'
import { RouteComponentProps } from '@reach/router'
import { Product, ProductTableHeader, Loading } from '../components'


interface GetProductProps extends RouteComponentProps {}


const GetProduct: React.FC<GetProductProps> = () => {
  const [
    getProduct,
    {loading, data, error}
  ] = useLazyQuery(PRODUCT_QUERY)

  const [ASIN, setAsin] = useState('')
  if(loading) return <Loading />


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getProduct({ variables: { asin: ASIN }})
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ASIN}
          onChange={(e) => setAsin(e.target.value)}
        />
        <input
          type='submit'
          value="Submit"
        />
      </form>
      { error && <p>ERROR: {error.message}</p>}
      { data && data.getProduct
        && 
          <table>
            <ProductTableHeader />
            <tbody>
              <Product key={data.getProduct.ASIN} product={data.getProduct}/> 
            </tbody>
          </table>}
      <a href="/products">Go to products list</a>
    </div>
  )
}

export default GetProduct