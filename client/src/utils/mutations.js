// This text is to allow GitHub to recognize this file and it parent folder's existence
import { gql } from '@apollo/client';

export const ADD_PRODUCE = gql`
mutation AddProduce($producePrice: Float!, $produceType: String!, $produceName: String!, $produceId: Int!, $produceInventory: Int, $produceUnits: String, $produceAllergens: String, $produceAvailability: Boolean, $produceDescription: String, $produceImage: String) {
  addProduce(producePrice: $producePrice, produceType: $produceType, produceName: $produceName, produceId: $produceId, produceInventory: $produceInventory, produceUnits: $produceUnits, produceAllergens: $produceAllergens, produceAvailability: $produceAvailability, produceDescription: $produceDescription, produceImage: $produceImage) {
    produceName
    producePrice
    produceType
    produceId
    produceAllergens
    produceAvailability
    produceDescription
    produceDescription
    produceDescription
    produceImage
    produceInventory
    produceUnits
  }
}
`;