const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors =  require('cors');

const app = express();

//allow cross origin request
app.use(cors());

//connect to mongo
mongoose.connect('mongodb://gmrsagar:s11030479@ds139193.mlab.com:39193/gql-mongo');
mongoose.connection.once('open', () => {
  console.log('database ready')
})

app.use('/graphql', graphqlHTTP({
 schema,
 graphiql: true
}))

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
