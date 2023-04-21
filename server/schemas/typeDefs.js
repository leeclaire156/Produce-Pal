const { gql } = require('apollo-server-express');

// "!" means "required: true" -> make sure it matches the model

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String
    biography: String
    phone: String
    sales: [Order]
    orders: [Order]
    vendorStatus: Boolean
    vendorName: String
    vendorDescription: String
    products: [Product]
    pickupLocation: String
    vendorTelephone: String
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
    sales: [Order]
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
        address: String
        biography: String
        phone: String
        vendorStatus: Boolean!
        vendorName: String
        vendorDescription: String
        pickupLocation: String
        vendorTelephone: String
        # # TO DO! when tokens are ready, use below for last line
        # vendorAddress: String): Auth
        vendorAddress: String): User
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
        productImage: String
        user: [ID]!): Product
    addOrder(
        products: [ID]!,
        user: [ID]!,
        seller: [ID]!): Order
    updateUser(
        _id: ID
        firstName: String
        lastName: String
        email: String
        password: String
        address: String
        biography: String
        phone: String        
        vendorStatus: Boolean
        vendorName: String
        vendorDescription: String
        pickupLocation: String
        vendorTelephone: String
        vendorAddress: String
        user: [ID]!): User
    updateOrder(
        _id: ID
        orderId: Int
        purchaseDate: String
        products: [ID]
        orderType: String
        order: [ID]!): Order
    updateProduct(
        _id: ID
        productId: Int
        productName: String
        productType: Boolean
        productPrice: Float
        productCategory: String
        productInventory: Int
        productUnits: String
        productAllergens: String
        productAvailability: Boolean
        productDescription: String
        productImage: String
        product: [ID]!): Product
    # function decrementing the inventory number of products
    updateProductInventory(
        _id: ID
        productInventory: Int!
        product: [ID]!): Product
    # deleteUser(
    #     user: [ID]!): User
}
`;

module.exports = typeDefs;
