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

// Note to Claire: for the addresses, can they add their addresses in their dashboard? Like have a button that then triggers 
// the addAddress mutation for whatever address they want to edit? 

export const ADD_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus) {
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
}
`;

// export const ADD_USER = gql`
// mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $biography: String, $phone: String, $userImage: String, $vendorName: String, $vendorDescription: String, $marketName: String, $vendorTelephone: String, $vendorImage: String, $city: String!, $state: String!, $street: String!, $zipcode: String!, $addAddressEmail2: String!, $addVendorAddressCity2: String!, $addVendorAddressState2: String!, $addVendorAddressStreet2: String!, $addVendorAddressZipcode2: String!, $addVendorAddressEmail2: String!, $addPickupAddressCity2: String!, $addPickupAddressState2: String!, $addPickupAddressStreet2: String!, $addPickupAddressZipcode2: String!, $addPickupAddressEmail2: String!) {
//   addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, biography: $biography, phone: $phone, userImage: $userImage, vendorName: $vendorName, vendorDescription: $vendorDescription, marketName: $marketName, vendorTelephone: $vendorTelephone, vendorImage: $vendorImage) {
//     token
//     user {
//       _id
//       firstName
//       lastName
//       email
//       address {
//         street
//         city
//         state
//         zipcode
//       }
//       biography
//       phone
//       userImage
//       vendorStatus
//       vendorName
//       vendorDescription
//       marketName
//       pickupAddress {
//         street
//         city
//         state
//         zipcode
//       }
//       vendorTelephone
//       vendorAddress {
//         street
//         city
//         state
//         zipcode
//       }
//       vendorImage
//     }
//   }
//   addAddress(city: $city, state: $state, street: $street, zipcode: $zipcode, email: $addAddressEmail2) {
//     street
//     city
//     state
//     zipcode
//   }
//   addVendorAddress(city: $addVendorAddressCity2, state: $addVendorAddressState2, street: $addVendorAddressStreet2, zipcode: $addVendorAddressZipcode2, email: $addVendorAddressEmail2) {
//     street
//     city
//     state
//     zipcode
//   }
//   addPickupAddress(city: $addPickupAddressCity2, state: $addPickupAddressState2, street: $addPickupAddressStreet2, zipcode: $addPickupAddressZipcode2, email: $addPickupAddressEmail2) {
//     street
//     city
//     state
//     zipcode
//   }
// }
// `;

// for mutation above
// {
//   "firstName": "ASD",
//   "lastName": "ASDF",

//   "email": "user1@gmail.com",
//   "password": "password",
//   "phone": "1112223333",
//   "biography": "askdlfjlsajflasjfl;jsaldfjl;sajlfkjsldafj",

//   "addAddressEmail2": "user1@gmail.com",
//   "street": "12345 Kaskldfj St",
//   "city": "Aklasfj",
//   "state": "Cksdlafj",
//   "zipcode": "11111",


//   "vendorStatus": true,
//   "vendorName": "Kklsdajfljasf",

//   "addVendorAddressEmail2": "user1@gmail.com"
//   "addVendorAddressCity2": "Iaskjjlfj",
//   "addVendorAddressState2": "Oasjkldf",
//   "addVendorAddressStreet2": "33455 Bkdasljfla",
//   "addVendorAddressZipcode2": "30303",

//   "vendorDescription": "asdflsadlfasllfsadkf;sa;dfk;sakdf",
//   "vendorTelephone": "2223334444",

//   "marketName":"Marketpalooza"
//   "addPickupAddressEmail2": "user1@gmail.com",
//   "addPickupAddressStreet2": "22345 Adksjflasjf Dr",
//   "addPickupAddressCity2": "Bkasdljfa",
//   "addPickupAddressState2": "Bsdkalfjlasdjf",
//   "addPickupAddressZipcode2": "20202",

//   }