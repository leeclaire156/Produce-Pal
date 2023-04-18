const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    name: String!
}

type Product {
    _id: ID!
    name: String!
    price: Int
}

type Query {
    user: [User]
    product: [Product]
}

type Mutation {
    createProduct(name: String!, price: Int!): Product
}
`;

module.exports = typeDefs;
