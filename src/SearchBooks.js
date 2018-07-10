import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'

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
    this.setState(() => ({
      query: query
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
    const { books } = this.props
    const match = new RegExp(escapeRegExp(query), 'i')

    const showingBooks = query === ''
      // ? books
      // : books.filter((b) => (
      //   b.title.toLowerCase().includes(query.toLowerCase())
      ? books
      : books.filter((book) => match.test(book.title)||match.test(book.authors))
      //))

      showingBooks.sort(sortBy('title'))

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
              value={query}
              placeholder='Search by title or author'
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {showingBooks.map(book => (
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
