import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'
import sortBy from 'sort-by'
import escapeRegExp from 'escape-string-regexp'

class  SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
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

  render() {
    const { query } = this.state
    const { books } = this.props
    const showingBooks = query === ''
      ? books
      : books.filter((b) => (
        b.title.toLowerCase().includes(query.toLowerCase())
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
