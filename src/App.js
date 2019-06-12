import React from 'react'
import { Route } from 'react-router-dom'
import MyReads from './books/MyReads'
import SearchNewBooks from './books/SearchNewBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then(() => this.loadBooks())
    .catch(err => console.log(err))
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchNewBooks myReads={books} updateShelf={this.updateShelf.bind(this)} />
        )}/>
        <Route exact path='/' render={() => (
          <MyReads books={books} updateShelf={this.updateShelf.bind(this)} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
