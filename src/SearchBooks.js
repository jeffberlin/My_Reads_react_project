import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class  SearchBooks extends Component {
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


    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            to='/'
            className='close-search'
          />
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
