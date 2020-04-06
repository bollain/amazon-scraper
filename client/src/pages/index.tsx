import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Products from './products'

import { PageContainer } from '../components';
import GetProduct from './get-product';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Products path="/products"/>
          <GetProduct path="/"/>
        </Router>
      </PageContainer>
    </Fragment>
  );
}