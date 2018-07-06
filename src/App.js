import React, { Component } from 'react'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }))
      })
  }

  changeShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )} />
      </div>

    )
  }
}

export default BooksApp
