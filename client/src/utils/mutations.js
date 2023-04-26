// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const ADD_PRODUCT = gql`
mutation addProduct($productId: Int!, $productName: String!, $productPrice: Float!, $user: [ID]!, $productType: Boolean, $productCategory: String, $productInventory: Int, $productUnits: String, $productAllergens: String, $productDescription: String, $productAvailability: Boolean, $productImage: String) {
  addProduct(productId: $productId, productName: $productName, productPrice: $productPrice, user: $user, productType: $productType, productCategory: $productCategory, productInventory: $productInventory, productUnits: $productUnits, productAllergens: $productAllergens, productDescription: $productDescription, productAvailability: $productAvailability, productImage: $productImage) {
    productAllergens
    productAvailability
    productCategory
    productDescription
    productId
    productImage
    productInventory
    productName
    productPrice
    productType
    productUnits
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
export const UPDATE_USER = gql`
mutation updateUser($user: [ID]!, $firstName: String!, $lastName: String!, $phone: String, $biography: String, $city: String, $state: String, $street: String, $zipcode: String, $address: [ID]!) {
  updateUser(user: $user, firstName: $firstName, lastName: $lastName, phone: $phone, biography: $biography) {
    user { 
      _id
      firstName
      lastName
      address {
        street
        city
        state
        zipcode
      }
      biography
      phone
    }
  }
  updateAddress(city: $city, state: $state, street: $street, zipcode: $zipcode, address: $address) {
    street
    city
    state
    zipcode
  }
}
`