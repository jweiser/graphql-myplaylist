const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const connectionString = require('./secrets');

const app = express();

mongoose.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.connection.once('open', () => {
    console.log(`connected to database`);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = 4000;
app.listen(port, () => {
    console.log('Now listening for requests on port ' + port);
});