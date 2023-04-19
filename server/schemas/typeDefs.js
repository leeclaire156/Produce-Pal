const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    # orders: [Order]
    vendorStatus: Boolean
    vendorName: String!
    vendorDescription: String!
    # vendorStore: [Product]
    pickupLocation: String!
    vendorTelephone: Int
    vendorAddress: String!
}

type Product {
    _id: ID
    productId: Int!
    productName: String!
    productType: Boolean
    productPrice: Float!
    productCategory: String
    productInventory: Int
    productUnits: String
    productAllergens: String
    productAvailability: Boolean
    productDescription: String
    productImage: String
}

type Query {
    users: [User]
    products: [Product]
}

type Mutation {
    # createProduct(name: String!, price: Int!): Product
    addProduct(
        _id: ID,
    productId: Int!,
    productName: String!,
    productType: Boolean,
    productPrice: Float!,
    productCategory: String,
    productInventory: Int,
    productUnits: String,
    productAllergens: String,
    productAvailability: Boolean,
    productDescription: String,
    productImage: String): Product
}
`;

module.exports = typeDefs;
