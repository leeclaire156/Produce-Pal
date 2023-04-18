// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const QUERY_PRODUCE = gql`
query Produce {
    produce {
    _id
    produceAllergens
    produceAvailability
    produceId
    produceType
    produceUnits
    producePrice
    produceInventory
    produceImage
    produceName
    produceName
    produceDescription
    }
}`