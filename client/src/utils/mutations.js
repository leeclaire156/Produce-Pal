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
<<<<<<< HEAD
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
=======
mutation Register($firstName: String!, $lastName: String!, $email: String!, $password: String!, $vendorStatus: Boolean!, $biography: String, $phone: String, $userImage: String, $vendorName: String, $vendorDescription: String, $vendorTelephone: String, $vendorImage: String, $addVendorAddressCity2: String!, $addVendorAddressState2: String!, $addVendorAddressStreet2: String!, $addVendorAddressZipcode2: String!, $addVendorAddressEmail2: String!, $city: String!, $state: String!, $street: String!, $zipcode: String!, $addAddressEmail2: String!, $addPickupAddressCity2: String!, $addPickupAddressState2: String!, $addPickupAddressStreet2: String!, $addPickupAddressZipcode2: String!, $addPickupAddressEmail2: String!, $marketName: String) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, vendorStatus: $vendorStatus, biography: $biography, phone: $phone, userImage: $userImage, vendorName: $vendorName, vendorDescription: $vendorDescription, vendorTelephone: $vendorTelephone, vendorImage: $vendorImage, marketName: $marketName) {    
    # token #for authorization
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
    marketName
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
  addPickupAddress(city: $addPickupAddressCity2, state: $addPickupAddressState2, street: $addPickupAddressStreet2, zipcode: $addPickupAddressZipcode2, email: $addPickupAddressEmail2) {
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
// for mutation above
// {
//   "firstName": "ASD",
//   "lastName": "ASDF",
>>>>>>> 851f9177ae32f9f2694d37ef9302ca74151d24ca

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
//   "vendorDescription": "asdflsadlfasllfsadkf;sa;dfk;sakdf",
//   "vendorTelephone": "2223334444",

//   "marketName":"Marketpalooza"
//   "addPickupAddressEmail2": "user1@gmail.com",
//   "addPickupAddressStreet2": "22345 Adksjflasjf Dr",
//   "addPickupAddressCity2": "Bkasdljfa",
//   "addPickupAddressState2": "Bsdkalfjlasdjf",
//   "addPickupAddressZipcode2": "20202",


//   "addVendorAddressEmail2": "user1@gmail.com"
//   "addVendorAddressCity2": "Iaskjjlfj",
//   "addVendorAddressState2": "Oasjkldf",
//   "addVendorAddressStreet2": "33455 Bkdasljfla",
//   "addVendorAddressZipcode2": "30303",
//   }