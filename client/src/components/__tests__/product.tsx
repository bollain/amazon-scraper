import React from 'react';

import { render, cleanup } from '../../test-utils';
import Product from '../product';

describe('Product Component', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  const mockProduct = {
    __typename: 'Product',
    ASIN: "B01N1037CV",
    category: "Video Games",
    dimensions: "1.3 x 10.4 x 16.8 cm ; 59 g",
    rank: "#1 in Videogames"
  }

  it('renders without error', () => {
    render(
      <Product product={mockProduct}/>,
    );
  });
});