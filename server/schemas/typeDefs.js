const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
}

type Produce {
    _id: ID!
    name: String!
    price: Int
}

type Query {
    user: [User]
    produce: [Produce]
}

type Mutation {
    createProduce(name: String!, price: Int!): Produce
}
`;

module.exports = typeDefs;
