const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Address {
    _id: ID!
    street: String,
    city: String, 
    state: String, 
    zipcode: String
}

type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    address: [Address]
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
    marketName: String
    pickupAddress: [Address]
    vendorTelephone: String
    vendorAddress: [Address]
    vendorImage: String
}

type Product {
    _id: ID
    productId: String
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
    orderId: String
    purchaseDate: String!
    buyerName: [User]
    sellerName: [User]
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
type Auth {
    token: ID
    user: User
}

type Query {
    # Because we have the context functionality in our resolvers.js Query function in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    # myprofile: User
    addresses: [Address]
    users: [User]
    farms(vendorStatus: Boolean): [User]
    products: [Product]
    sales: [Order]
    orders: [Order]
    address(_id: ID!): Address
    product(_id: ID!): Product
    order(_id: ID!): Order
    profile(profileId: ID!): User
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addAddress(
        city: String
        state: String
        street: String
        zipcode: String
        email: String!): Address
    addPickupAddress(
        city: String
        state: String
        street: String
        zipcode: String
        email: String!): Address
    addVendorAddress(
        city: String
        state: String
        street: String
        zipcode: String
        email: String!): Address
    addUser(    
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        biography: String
        phone: String
        userImage: String
        vendorStatus: Boolean!
        vendorName: String
        vendorDescription: String
        marketName: String
        vendorTelephone: String
        vendorImage: String
        # # TO DO! when tokens are ready, use below for last line
        ): Auth
        # ): User
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
        biography: String
        phone: String  
        userImage: String    
        vendorStatus: Boolean
        vendorName: String
        vendorDescription: String
        marketName: String
        vendorTelephone: String
        vendorImage: String
        user: [ID]!): User
    updateAddress(
        city: String
        state: String
        street: String
        zipcode: String
        address: [ID]!): Address
    updateVendorAddress(
        city: String
        state: String
        street: String
        zipcode: String
        address: [ID]!): Address
    updatePickupAddress(
        city: String
        state: String
        street: String
        zipcode: String
        address: [ID]!): Address
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
        # user: [ID]!): User
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
