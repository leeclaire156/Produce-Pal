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
// export const LOGIN = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         email
//       }
//     }
//   }
// `;

// export const ADD_USER = gql`
// mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $address: String, $biography: String, $phone: String, $vendorName: String, $vendorDescription: String, $pickupLocation: String, $vendorTelephone: String, $vendorAddress: String) {
//   addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, address: $address, biography: $biography, phone: $phone, vendorName: $vendorName, vendorDescription: $vendorDescription, pickupLocation: $pickupLocation, vendorTelephone: $vendorTelephone, vendorAddress: $vendorAddress) {
//     token
//     user {
//     firstName
//     lastName
//     email
//     address
//     biography
//     phone
//     vendorStatus
//     vendorName
//     vendorDescription
//     pickupLocation
//     vendorTelephone
//     vendorAddress
//             }
//   }
// }
// `;

export const ADD_USER = gql`
mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $biography: String, $phone: String, $userImage: String, $vendorName: String, $vendorDescription: String, $pickupLocation: String, $vendorTelephone: String, $vendorImage: String, $addVendorAddressCity2: String!, $addVendorAddressState2: String!, $addVendorAddressStreet2: String!, $addVendorAddressZipcode2: String!, $addVendorAddressEmail2: String!, $city: String!, $state: String!, $street: String!, $zipcode: String!, $addAddressEmail2: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, biography: $biography, phone: $phone, userImage: $userImage, vendorName: $vendorName, vendorDescription: $vendorDescription, pickupLocation: $pickupLocation, vendorTelephone: $vendorTelephone, vendorImage: $vendorImage) {
    firstName
    lastName
    email
    address {
      _id
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
    pickupLocation
    vendorTelephone
    vendorAddress {
      _id
      street
      city
      state
      zipcode
    }
    vendorImage
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
}
`;
// For the mutation above
// {
//   "firstName":"asdf",
//   "lastName":"asdf",
//   "email":"asdf7@email.com",
//   "password":"asdfasdf",
//   "biography":"asdf",
//   "phone":"asdf",
//   "userImage":"asdf",
//   "vendorStatus":true,
//   "vendorName":"asdf",
//   "vendorDescription":"asdf",
//   "pickupLocation":"asdf",
//   "vendorTelephone":"asdf",
//   "vendorImage": "asdf",

//   "city": "Chantilly",
//   "state": "Virginia",
//   "street": "12345 Main St",
//   "zipcode": "23220",
//   "addAddressEmail2": "asdf7@email.com",

//   "addVendorAddressCity2": "Baltimore",
//   "addVendorAddressState2": "Maryland",
//   "addVendorAddressStreet2": "54321 NotMain St",
//   "addVendorAddressZipcode2": "43210",
//   "addVendorAddressEmail2": "asdf7@email.com",
// }
