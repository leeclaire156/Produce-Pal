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

export const QUERY_ONLY_FARMS = gql`
query farms($vendorStatus: Boolean) {
  farms(vendorStatus: $vendorStatus) {
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

export const QUERY_SINGLE_PROFILE = gql`
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
    # vendorName
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
query me {
  me {
    _id
    address {
      _id
      city
      state
      street
      zipcode
    }
    orders {
      _id
      orderId
      orderType
      purchaseDate
      buyerName {
        _id
        firstName
        lastName
        userImage
      }
      sellerName {
        _id
        vendorName
        vendorImage
        pickupAddress {
          _id
          street
          city
          state
          zipcode
        }
        vendorTelephone
        email
      }
      products {
        _id
        productId
        productName
        productDescription
        productImage
        productPrice
        productType
        productUnits
        productCategory
        productAllergens
        productAvailability
        productInventory
      }
    }
    firstName
    lastName
    email
    biography
    phone
    # memberships {
    #   _id
    #   vendorName
    # }
    userImage
    vendorStatus
    vendorName
    vendorDescription
    vendorAddress {
      _id
      city
      state
      street
      zipcode
    }
    vendorTelephone
    vendorImage
    pickupAddress {
      _id
      street
      city
      state
      zipcode
    }
    marketName
    products {
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
    sales {
      _id
      orderId
      purchaseDate
      orderType
      buyerName {
        _id
        firstName
        lastName
        userImage
      }
      sellerName {
        _id
        vendorName
        vendorImage
        pickupAddress {
          _id
          street
          city
          state
          zipcode
        }
        vendorTelephone
        email
      }
      products {
        _id
        productId
        productName
        productDescription
        productImage
        productPrice
        productType
        productUnits
        productCategory
        productAllergens
        productAvailability
        productInventory
      }
    }
  }
}
`;

export const GET_IMAGE = gql`
query Me {
  me {
    userImage
  }
}
`

export const GET_VENDOR_IMAGE = gql`
query Me {
  me {
    vendorImage
  }
}
`
export const GET_USER = gql`
query Me {
  me{
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
}
}
`
export const GET_VENDOR = gql`
query Me {
  me {
    vendorStatus
    vendorName
    vendorAddress { 
      street
      city
      state
      zipcode
    }
    vendorTelephone
    vendorDescription
    marketName
    pickupAddress {
      street
      city
      state
      zipcode
    } 
  }
}
`
export const MY_PROFILE = gql`
query Query {
  myprofile {
    _id
    address {
      _id
      street
      city
      state
      zipcode
    }
    biography
    email
    firstName
    lastName
    marketName
    phone
    pickupAddress {
      _id
      street
      city
      state
      zipcode
    }
    userImage
    vendorAddress {
      _id
      street
      city
      state
      zipcode
    }
    vendorDescription
    vendorImage
    vendorName
    vendorStatus
    vendorTelephone
  }
}
`