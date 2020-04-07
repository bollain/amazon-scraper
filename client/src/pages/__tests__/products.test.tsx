import React from 'react';

import {
  renderApollo,
  cleanup,
  waitForElement,
} from '../../test-utils';
import Products from '../products';
import PRODUCTS_QUERY from '../../queries/getProducts'


const mockProducts = [
  {
    __typename: "Product",
    ASIN: "B01N1037CV",
    category: "Video Games",
    dimensions: "1.3 x 10.4 x 16.8 cm ; 59 g",
    rank: "unranked"
  },
  {
    __typename: "Product",
    ASIN: "B002QYW8LW",
    category: "Baby",
    dimensions: null,
    rank: "#58 in Baby"
  },
  {
    __typename: "Product",
    ASIN: "B00ISQ6ZKC",
    category: "Home",
    dimensions: null,
    rank: "#756 in Home "
  }
];

describe('Products Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders products', async () => {
    const mocks = [
      {
        request: { query: PRODUCTS_QUERY },
        result: { data: { products: mockProducts } },
      },
    ];
    const { getByText } = await renderApollo(<Products />, {
      mocks,
      resolvers: {}
    });
    await waitForElement(() => getByText(/#58 in Baby/i));
  });
});