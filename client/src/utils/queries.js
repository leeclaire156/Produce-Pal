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
    }
    vendorTelephone
    vendorAddress {
      _id
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
        # address {
        #   _id
        #   street
        #   city
        #   state
        #   zipcode
        # }
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
        # pickupAddress {
        #   _id
        # }
        vendorTelephone
        # vendorAddress {
        #   _id
        # }
        vendorImage
        }
    }
`;