import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
  }

  state = {
    shelf: 'none'
  }

  updateShelf(book, shelf) {
    this.setState({ shelf });
    this.props.updateShelf(book, shelf);
  }

  componentDidMount() {
    this.setState({
      shelf: this.props.book.shelf || 'none'
    });
  }

  render() {
    const { book } = this.props;
    const { shelf } = this.state;

    return (      
      <div className="book">
        <div className="book-top">          
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail?`${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => this.updateShelf(book, event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{ book.authors ? book.authors.join(', ') : '' }</div>        
      </div>
    )
  }
}

export default Book