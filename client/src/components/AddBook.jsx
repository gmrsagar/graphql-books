import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    }
  }


  displayAuthors() {
    let data = this.props.getAuthorsQuery
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

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  render() {
    return (
      <form action="" id="add-book" onSubmit={this.submitForm}>
        <div className="fields">
          <label htmlFor="">Book Name:</label>
          <input onChange={ (e) => { this.setState({ name: e.target.value }) }} type="text" name="" id=""/>
        </div>
        <div className="fields">
          <label htmlFor="">Genre:</label>
          <input type="text" onChange={ (e) => { this.setState({ genre: e.target.value }) }} name="" id=""/>
        </div>
        <div className="fields">
          <label htmlFor="">Author:</label>
          <select name="" id="" onChange={ (e) => { this.setState({ authorId: e.target.value }) }}>
            <option value="0">Select Author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
  
}

export default compose(
  graphql(getAuthorsQuery, { name:"getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
