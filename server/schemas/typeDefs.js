const { gql } = require('apollo-server-express');

// "!" means "required: true" -> make sure it matches the model

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    orders: [Order]
    vendorStatus: Boolean
    vendorName: String
    vendorDescription: String
    products: [Product]
    pickupLocation: String
    vendorTelephone: Int
    vendorAddress: String
}

type Product {
    _id: ID!
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
    # orders: [Order]
    # users: [User]
}

type Order {
    _id: ID!
    orderId: Int
    purchaseDate: String!
    products: [Product]
    orderType: String!
}

# # TO DO! when tokens are ready, use below for adding a User
# type Auth {
#     token: ID
#     user: User
# }

type Query {
    users: [User]
    products: [Product]
    orders: [Order]
    product(_id: ID!): Product
    order(_id: ID!): Order
    user(_id: ID!): User
}

type Mutation {
    addUser(    
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        vendorStatus: Boolean!
        vendorName: String
        vendorDescription: String
        pickupLocation: String
        vendorTelephone: Int
        vendorAddress: String): User
    # # TO DO! when tokens are ready, use below for adding a User
    # addUser(    
    #     _id: ID
    #     firstName: String!
    #     lastName: String!
    #     email: String!
    #     orders: [Order]
    #     vendorStatus: Boolean
    #     vendorName: String
    #     vendorDescription: String
    #     products: [Product]
    #     pickupLocation: String
    #     vendorTelephone: Int
    #     vendorAddress: String): Auth
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
    addOrder(
        products: [ID]!,
        users: [ID]!): Order

}
`;

module.exports = typeDefs;
