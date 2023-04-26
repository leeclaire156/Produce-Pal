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

export const QUERY_ADDRESSES = gql`
query Addresses {
  addresses {
    city
    state
    street
    zipcode
  }
}
`;

export const QUERY_USERS = gql`
query Query {
  users {
    _id
    firstName
    lastName
    email
    address {
      _id
      city
      state
      street
      zipcode
    }
    biography
    phone
    userImage
    memberships {
      _id
      vendorName
      vendorTelephone
      vendorAddress {
        _id
        city
        state
        street
        zipcode
      }
      vendorDescription
    }
    vendorStatus
    vendorName
    vendorDescription
    products {
      _id
      productName
    }
    marketName
    pickupAddress {
      _id
      city
      state
      street
      zipcode
    }
    vendorTelephone
    vendorAddress {
      _id
      city
      state
      street
      zipcode
    }
    vendorImage
    sales {
      _id
    }
    orders {
      _id
    }
  }
}
`;

export const QUERY_SINGLE_PROFILE = gql `
query singleProfile($profileId: ID!) {
  profile(profileId: $profileId) {
    _id
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
    memberships {
      _id
    }
    sales {
      _id
    }
    orders {
      _id
    }
    vendorStatus
    vendorName
    vendorDescription
    products {
      _id
    }
    marketName
    pickupAddress {
      _id
      street
      city
      state
      zipcode
    }
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
}
`;

// For login/signup uncomment below
export const GET_ME = gql`
    query me{
      me{
        _id
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
        memberships {
          _id
        }
        sales {
          _id
        }
        orders {
          _id
        }
        vendorStatus
        vendorName
        vendorDescription
        products {
          _id
        }
        marketName
        pickupAddress {
          _id
          street
          city
          state
          zipcode
        }
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
    }
`;