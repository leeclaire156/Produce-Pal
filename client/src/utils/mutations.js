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
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $biography: String, $phone: String, $userImage: String, $vendorName: String, $vendorDescription: String, $marketName: String, $vendorTelephone: String, $vendorImage: String, $city: String, $state: String, $street: String, $zipcode: String, $addAddressEmail2: String!, $addVendorAddressCity2: String, $addVendorAddressState2: String, $addVendorAddressStreet2: String, $addVendorAddressZipcode2: String, $addVendorAddressEmail2: String!, $addPickupAddressCity2: String, $addPickupAddressState2: String, $addPickupAddressStreet2: String, $addPickupAddressZipcode2: String, $addPickupAddressEmail2: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, biography: $biography, phone: $phone, userImage: $userImage, vendorName: $vendorName, vendorDescription: $vendorDescription, marketName: $marketName, vendorTelephone: $vendorTelephone, vendorImage: $vendorImage) {
    token
    user {
      _id
      firstName
      lastName
      email
      address {
        street
        city
        state
        zipcode
      }
      biography
      phone
      userImage
      vendorStatus
      vendorName
      vendorDescription
      marketName
      pickupAddress {
        street
        city
        state
        zipcode
      }
      vendorTelephone
      vendorAddress {
        street
        city
        state
        zipcode
      }
      vendorImage
    }
  }
  addAddress(city: $city, state: $state, street: $street, zipcode: $zipcode, email: $addAddressEmail2) {
    street
    city
    state
    zipcode
  }
  addVendorAddress(city: $addVendorAddressCity2, state: $addVendorAddressState2, street: $addVendorAddressStreet2, zipcode: $addVendorAddressZipcode2, email: $addVendorAddressEmail2) {
    street
    city
    state
    zipcode
  }
  addPickupAddress(city: $addPickupAddressCity2, state: $addPickupAddressState2, street: $addPickupAddressStreet2, zipcode: $addPickupAddressZipcode2, email: $addPickupAddressEmail2) {
    street
    city
    state
    zipcode
  }
}
`

export const UPDATE_USER_IMAGE = gql`
mutation updateUserImage($user: [ID]!, $userImage: String) {
  updateUser(user: $user, userImage: $userImage) {
    userImage
  }
}
`
export const UPDATE_VENDOR_IMAGE = gql`
mutation updateVendorImage($user: [ID]!, $vendorImage: String) {
  updateUser(user: $user, vendorImage: $vendorImage) {
    vendorImage
  }
}
`