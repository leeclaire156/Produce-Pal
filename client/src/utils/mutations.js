// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
mutation Mutation($productId: Int!, $productName: String!, $productPrice: Float!, $productType: Boolean, $productCategory: String, $productInventory: Int, $productUnits: String, $productAllergens: String, $productAvailability: Boolean, $productDescription: String, $productImage: String, $user: [ID]!) {
  addProduct(productId: $productId, productName: $productName, productPrice: $productPrice, productType: $productType, productCategory: $productCategory, productInventory: $productInventory, productUnits: $productUnits, productAllergens: $productAllergens, productAvailability: $productAvailability, productDescription: $productDescription, productImage: $productImage, user: $user){ 
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
    _id #for user
  }
}
`;