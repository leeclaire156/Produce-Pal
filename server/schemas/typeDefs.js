const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: String
    biography: String
    phone: String
    userImage: String
    memberships: [User]
    sales: [Order]
    orders: [Order]
    vendorStatus: Boolean
    vendorName: String
    vendorDescription: String
    products: [Product]
    pickupLocation: String
    vendorTelephone: String
    vendorAddress: String
    vendorImage: String
    vendorImage: String
}

type Product {
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
}

type Order {
    _id: ID!
    orderId: Int
    purchaseDate: String!
    products: [Product]
    orderType: String!
}

type Checkout {
    session: ID
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
    products: [Product]
}
# # TO DO! when tokens are ready, use below for adding a User. UNCOMMENT line 52-55, 59, swap 86 for 85, and uncomment 149
# type Auth {
#     token: ID
#     user: User
# }

type Query {
    # Because we have the context functionality in our resolvers.js Query function in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    # me: User
    users: [User]
    products: [Product]
    sales: [Order]
    orders: [Order]
    product(_id: ID!): Product
    order(_id: ID!): Order
    user(_id: ID!): User
    checkout(products: [ID]!): Checkout
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
        userImage: String
        userImage: String
        vendorStatus: Boolean!
        vendorName: String
        vendorDescription: String
        pickupLocation: String
        vendorTelephone: String
        vendorImage: String
        # # TO DO! when tokens are ready, use below for last line
        # vendorAddress: String): Auth
        vendorAddress: String
        vendorImage: String): User
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
        userImage: String    
        vendorStatus: Boolean
        vendorName: String
        vendorDescription: String
        pickupLocation: String
        vendorTelephone: String
        vendorAddress: String
        vendorImage: String
        vendorImage: String
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
    # login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
