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
// For login/signup uncomment below
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $address: String, $biography: String, $phone: String, $vendorName: String, $vendorDescription: String, $pickupLocation: String, $vendorTelephone: String, $vendorAddress: String) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, address: $address, biography: $biography, phone: $phone, vendorName: $vendorName, vendorDescription: $vendorDescription, pickupLocation: $pickupLocation, vendorTelephone: $vendorTelephone, vendorAddress: $vendorAddress) {
    token
    user {
    firstName
    lastName
    email
    address
    biography
    phone
    vendorStatus
    vendorName
    vendorDescription
    pickupLocation
    vendorTelephone
    vendorAddress
            }
  }
}
`;

