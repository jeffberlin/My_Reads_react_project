import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import sortBy from 'sort-by'

// This page handles the listing of the books on their chosen shelves
class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  updateBook(shelf) {
    this.props.onChangeShelf(this.props.book, shelf)
  }

  render() {
    const { books } = this.props
    const bookShelf = ["currentlyReading", "wantToRead", "read"]
    const shelfName = ["Currently Reading", "Want To Read", "Read"]

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>My Reads</h1>
          {bookShelf.map((shelf, index) => {
          <div key={index} className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName[index]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.sort(sortBy('title')).filter(book => book.shelf === shelf).map(book => (
                      <Book
                        onChangeShelf={this.props.onChangeShelf}
                        key={book.id}
                        book={book}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        })}
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
