import Backbone from 'backbone';
import Book from '../models/book';

const BookList = Backbone.Collection.extend({
  model: Book,
  url: 'http://localhost:3000/books',
  parse(response) {
    return response['books'];
    // console.log(response)
  }
})

export default BookList;
