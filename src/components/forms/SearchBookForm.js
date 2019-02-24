import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Form, Dropdown } from 'semantic-ui-react'

export class SearchBookForm extends Component {
  static propTypes = {
    onBookSelect: PropTypes.func.isRequired
  }

  state = {
    query: '',
    loading: false,
    options: [{
      key: 1,
      value: 1,
      text: 'first book'
    }, {
      key: 2,
      value: 2,
      text: 'second book'
    }],
    books: {}
  }

  onChange = (e, data) => {
    this.setState({ query: data.value })
    console.log(data.value)
    this.props.onBookSelect(this.state.books[data.value])
  }

  onSearchChange = (e, { searchQuery }) => {
    clearTimeout(this.timer)
    this.setState({ query: searchQuery, loading: false })
    this.timer = setTimeout(this.fetchOptions, 1000)
  }

  fetchOptions = () => {
    if (!this.state.query) return
    this.setState({ loading: true })
    axios.get(`/api/books/search?q=${this.state.query}`)
      .then(res => res.data.books)
      .then(books => {
        const options = []
        const booksHash = {}
        books.forEach(book => {
          booksHash[book.goodreadsId] = book
          options.push({
            key: book.goodreadsId,
            value: book.goodreadsId,
            text: book.title
          })
        })
        this.setState({ options, loading: false, books: booksHash })
      })
  }

  render () {
    const { options, loading, query } = this.state
    return (
      <Form>
        <Dropdown
          search
          fluid
          placeholder='Search for a book by title'
          value={query}
          onSearchChange={this.onSearchChange}
          onChange={this.onChange}
          options={options}
          loading={loading}
        />
      </Form>
    )
  }
}

export default SearchBookForm
