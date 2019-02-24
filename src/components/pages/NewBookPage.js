import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import SearchBookForm from '../forms/SearchBookForm'
import BookForm from '../forms/BookForm'

export class NewBookPage extends Component {
  static propTypes = {

  }

  state = {
    book: null
  }

  onBookSelect = book => this.setState({ book })

  addBook = () => console.log('addBook')

  render () {
    return (
      <Segment>
        <h1>Add new book to your collection.</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />
        {
          this.state.book && <BookForm submit={this.addBook} book={this.state.book} />
        }
      </Segment>
    )
  }
}

export default NewBookPage
