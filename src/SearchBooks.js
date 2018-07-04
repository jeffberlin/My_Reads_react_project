import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class  SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  clearQuery = () => {
    this.updateQuery('')
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    const { query } = this.state
    const { books, onChangeShelf } = this.props
    const match = new RegExp(escapeRegExp(query), 'i')
    const showingBooks = query === ''
      ? books
      : books.filter((b) => (
        match.test(b.title)||match.test(b.authors)
      ))

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            className='close-search'
            to='/'
          >Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
