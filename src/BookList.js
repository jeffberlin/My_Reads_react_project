import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

// This page handles the listing of the books on their chosen shelves
class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  // state = {
  //   books: []
  // }
  updateBook(shelf) {
    this.props.onChangeShelf(this.props.book, shelf)
  }

  render() {
    const { books } = this.props

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>My Reads</h1>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookshelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.map((book) => {
                      <li key={book.id}>
                        
                      </li>
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='open-search'>
            <Link
              to='/search'>Add a book>
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

export default BookList
