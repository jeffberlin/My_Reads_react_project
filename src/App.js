import React, { Component } from 'react'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
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
      <div>
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
          />
        )} />
      </div>

    )
  }
}

export default BooksApp
