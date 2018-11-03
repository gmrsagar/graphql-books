  /**
   * External query file
   * 
   * This file contains the queries needed
   */
  import { gql } from "apollo-boost";

  const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      id
      name
    }
  }
`

//Mutations
const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name:$name, genre:$genre, authorId:$authorId) {
      name
      id
    }
  }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation };
