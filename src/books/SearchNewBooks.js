import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import { DebounceInput } from 'react-debounce-input'

class SearchNewBooks extends Component {
  static propTypes = {
    myReads: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    const trimedQuery = query.trim();
    this.setState({ query: query })
    if (trimedQuery.length > 0) {
      this.searchBooks(trimedQuery);
    } else {
      this.setState({ books: [] })
    }
  }
  
  searchBooks(query) {
    BooksAPI.search(query).then((books) => {
      this.setState({ books: !books.error ? books : [] })
    })
  }

  render() {
    const { query, books } = this.state
    const { myReads, updateShelf } = this.props

    const shelvedBooks = books.map(book => {
      const myRead = myReads.find(myRead => myRead.id === book.id);
      if (myRead) return Object.assign({}, book, { shelf: myRead.shelf });
      else return Object.assign({}, book);
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className='close-search'>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">            
            <DebounceInput
              placeholder="Search by title or author"
              minLength={2}
              debounceTimeout={300}
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          { shelvedBooks && shelvedBooks.length > 0 && (
            <ol className="books-grid">
              {
                shelvedBooks
                  .map((book) => (
                    <li key={book.id}>
                      <Book book={book} updateShelf={updateShelf} />
                    </li>
                  ))
              }
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchNewBooks