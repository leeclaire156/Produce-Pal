const { gql } = require('apollo-server-express');

const typeDefs = gql`
# type User {
#     _id: ID!
#     name: String!
# }

type Produce {
    _id: ID
    produceId: Int
    produceName: String
    producePrice: Int
    produceType: String
}

type Query {
    # users: [User]
    produces: [Produce]
}

# type Mutation {
#     createProduce(name: String!, price: Int!): Produce
# }
`;

module.exports = typeDefs;
