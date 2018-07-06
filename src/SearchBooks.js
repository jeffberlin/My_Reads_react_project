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
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.sort(sortBy('title')).map(book => (
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
