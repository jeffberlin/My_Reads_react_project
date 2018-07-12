import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class  SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  state = {
    query: '',
    books: []
  }
  updateQuery = (query) => {
    if (!query) {
      this.setState({ query: '', books: [] })
    } else {
      this.setState({ query: query.trim() })
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = []
        }
        books.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
        this.setState({ books })
      })
    }
  }

  render() {
    const { query } = this.state

    this.state.books.sort(sortBy('title'))

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
              //value={query}
              placeholder='Search by title or author'
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map(book => (
              <Book
                onChangeShelf={this.props.onChangeShelf}
                key={book.id}
                book={book}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
