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
  GraphQLSchema,
  GraphQLList
} = graphql; //destructre

let books = [
  {name: 'Lord of The Rings', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'Game of Throne', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'Starwars', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'StarTrek', genre: 'Sci-Fi', id: '4', authorId: '3'},
  {name: 'Hobbit', genre: 'Fantasy', id: '5', authorId: '1'},
  {name: 'The Two Towers', genre: 'Fantasy', id: '6', authorId: '1'},
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
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
