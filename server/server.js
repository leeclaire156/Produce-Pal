const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const path = require('path');
const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const uploadImage = require('./config/uploadImage.js')
const cors = require("cors")


const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    // context: authMiddleware,
    typeDefs,
    resolvers
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
        .then((url) => res.send(url))
        .catch((err) => res.status(500).send(err));
});

app.post("/uploadMultipleImages", (req, res) => {
    uploadImage
        .uploadMultipleImages(req.body.images)
        .then((urls) => res.send(urls))
        .catch((err) => res.status(500).send(err));
});

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);