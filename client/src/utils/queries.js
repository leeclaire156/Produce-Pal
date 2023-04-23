// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const QUERY_PRODUCT = gql`
query Product {
        product {
            _id
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

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    firstName
    lastName
    email
    address
    biography
    phone
    memberships {
      _id
      firstName
      vendorName
      products {
        _id
        productName
      }
    }
    orders {
      _id
      orderType
      purchaseDate
      products {
        _id
        productName
      }
    }
    vendorStatus
    vendorName
    vendorTelephone
    vendorAddress
    pickupLocation
    vendorDescription
    sales {
      _id
      orderType
      purchaseDate
      products {
        _id
        productName
      }
    }
    products {
      _id
      productName
    }
  }
}
`;

export const QUERY_USER = gql `
query User($id: ID!) {
  user(_id: $id) {
    firstName
    lastName
    email
    address
    vendorName
    vendorAddress
    vendorTelephone
    vendorDescription
    vendorStatus
  }
}
`;

// For login/signup uncomment below
// export const GET_ME = gql`
//     query me{
//         me{
//             _id
//             email
//         }
//     }
// `;