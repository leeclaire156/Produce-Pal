/* const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Vendor {
    _id: ID!
    name: String!
}

type Consumer {
    _id: ID!
    name: String!
}

type Product {
    _id: ID!
    name: String!
    price: Int
}

type Query {
    vendor: [Vendor]
    consumer: [Consumer]
    product: [Product]
}

type Mutation {
    createProduct(name: String!, price: Int!): Product
}
`;

module.exports = typeDefs;
*/