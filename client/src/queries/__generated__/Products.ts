/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_products {
  __typename: "Product";
  ASIN: string | null;
  category: string | null;
  rank: string | null;
  dimensions: string | null;
}

export interface Products {
  products: (Products_products | null)[] | null;
}
