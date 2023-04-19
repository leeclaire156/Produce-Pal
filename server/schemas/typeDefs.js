const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    orders: [Order]
    vendorStatus: Boolean
    vendorName: String!
    vendorDescription: String!
    vendorStore: [Product]
    pickupLocation: String!
    vendorTelephone: Int
    vendorAddress: String!
}

type Product {
    _id: ID
    productId: Int
    productName: String!
    productType: Boolean
    productPrice: Float
    productCategory: String!
    productInventory: Int
    productUnits: String!
    productAllergens: String!
    productAvailability: Boolean
    productDescription: String!
}

type Order {
    _id: ID
    orderId: Int
    purchaseDate: String!
    products: [Product]
    orderType: String!
}

type Query {
    users: [User]
    products: [Product]
    orders: [Order]
    # product(_id: ID!): Product
    # order(_id: ID!): Order
}

# type Mutation {
#     createProduct(name: String!, price: Int!): Product
# }
`;

module.exports = typeDefs;
