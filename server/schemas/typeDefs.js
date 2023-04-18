const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
}

type Produce {
    _id: ID
    produceId: Int!
    produceName: String!
    produceType: String!
    producePrice: Float!
    produceInventory: Int
    produceUnits: String
    produceAllergens: String
    produceAvailability: Boolean
    produceDescription: String
    produceImage: String
}

type Query {
    user: [User]
    produce: [Produce]
}

type Mutation {
    # createProduce(name: String!, price: Int!): Produce
    addProduce(
        _id: ID
    produceId: Int!
    produceName: String!
    produceType: String!
    producePrice: Float!
    produceInventory: Int
    produceUnits: String
    produceAllergens: String
    produceAvailability: Boolean
    produceDescription: String
    produceImage: String): Produce
}
`;

module.exports = typeDefs;
