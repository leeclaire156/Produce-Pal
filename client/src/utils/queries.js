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
}`