/**
 * Schema for graphql
 */

const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID, 
  GraphQLInt,
  GraphQLSchema} = graphql; //destructre

let books = [
  {name: 'Lord of The Rings', genre: 'Fantasy', id: '1'},
  {name: 'Game of Throne', genre: 'Fantasy', id: '2'},
  {name: 'Starwars', genre: 'Sci-Fi', id: '3'},
]

let authors = [
  {name: 'Mark Sausage', age: 44, id: '1'},
  {name: 'Henry Cavill', age: 23, id: '2'},
  {name: 'Han Solo', age: 34, id: '3'},
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
})

//Initial jump to the graph
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID } }, //book id of the book to be fetched
      resolve(parent, args){
        // code to get data from db
        return _.find(books, {id: args.id});
      } 
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent,args){
        return _.find(authors, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
