// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
mutation Mutation($productId: Int!, $productName: String!, $productType: Boolean!, $productPrice: Float!, $productImage: String, $productDescription: String, $productAllergens: String, $productUnits: String, $productInventory: Int, $productCategory: String, $productAvailability: Boolean) {
  addProduct(productId: $productId, productName: $productName, productType:$productType, productPrice: $productPrice, productImage: $productImage, productDescription: $productDescription, productAllergens: $productAllergens, productUnits: $productUnits, productInventory: $productInventory, productCategory: $productCategory, productAvailability: $productAvailability) {
    productId
    productName
    productType
    productPrice
    productCategory
    productInventory
    productUnits
    productAllergens
    productAvailability
    productDescription
    productImage
  }
}
`;