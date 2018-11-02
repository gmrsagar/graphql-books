import React, {Component} from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getAuthorsQuery = gql`
  {
    authors{
      id
      name
    }
  }
`

class AddBook extends Component {

  displayAuthors() {
    let data = this.props.data
    if (data.loading) {
      return ( <option disabled>Loading Authors</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
    
  }

  render() {
    return (
      <form action="" id="add-book">
        <div className="fields">
          <label htmlFor="">Book Name:</label>
          <input type="text" name="" id=""/>
        </div>
        <div className="fields">
          <label htmlFor="">Genre:</label>
          <input type="text" name="" id=""/>
        </div>
        <div className="fields">
          <label htmlFor="">Author:</label>
          <select name="" id="">
            <option value="0">Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
  
}

export default graphql(getAuthorsQuery)(AddBook)
