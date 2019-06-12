import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BooksShelf from './BooksShelf';
import PropTypes from 'prop-types'

class MyReads extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }  

  render() {
    const { books, updateShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BooksShelf title="Currently Reading" updateShelf={updateShelf}
              books={books.filter((book) => book.shelf === 'currentlyReading')} />            
            <BooksShelf title="Want to Read" updateShelf={updateShelf}
              books={books.filter((book) => book.shelf === 'wantToRead')} />            
            <BooksShelf title="Read" updateShelf={updateShelf}
              books={books.filter((book) => book.shelf === 'read')} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>
              Add a book
              </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MyReads