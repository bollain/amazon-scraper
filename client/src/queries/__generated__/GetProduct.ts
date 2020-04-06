/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_getProduct {
  __typename: "Product";
  ASIN: string | null;
  category: string | null;
  rank: string | null;
  dimensions: string | null;
}

export interface GetProduct {
  getProduct: GetProduct_getProduct | null;
}

export interface GetProductVariables {
  asin: string;
}
