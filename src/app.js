
import $ from 'jquery';
import _ from 'underscore'

import 'foundation-sites/dist/css/foundation.css';
import './style.css';

import Book from './models/book';
import Cat from './models/cat';
import BookList from './collections/book_list';
import CatList from './collections/cat_list'


const someBook = new Book({
  title: "This is the Story of a Girl who cried a river and drown the whole fucking world",
  author: "whatev",
  publication_year: 1992
})

console.log(someBook.age())
console.log(someBook.toString())
// const codingInterview = new Book(
// {
//   title: 'Cracking the Coding Interview',
//   author: 'Gale',
//   publication_year: 2011,
// })
//In backbone, THOU SHALT NEVER change the attributes directly; It'll bypass any validations you have. Also, it won't trigger any alerts that will update the API.

//you can access the attributes to read, but don't change them.
// codingInterview.set('title', 'JESUS HELP ME.')
//this method alerts necessary channels that you've changed shit.
// console.log(`Title is: ${codingInterview.get('title')}`)
//
//
//
// console.log(codingInterview);

// const rawBookData = [
//   {
//     title: 'Practical Object-Oriented Design in Ruby',
//     author: 'Sandy Metz',
//     publication_year: 2012
//   }, {
//     title: 'Parable of the Sower',
//     author: 'Octavia Butler',
//     publication_year: 1993
//   }, {
//     title: 'A Wizard of Earthsea',
//     author: 'Ursula K. Le Guin',
//     publication_year: 1969
//   }
// ];

const bookList = new BookList();
// bookList.add(codingInterview);
// bookList.add({title: "The Great Gatsby", author: "F Scot Fitz", publication_year: 1922})
// console.log(bookList)
// console.log(bookList.at(2).get('title'));
// console.log(bookList.get('c2'))
//

// const newBooks = bookList.filter((book) => {return book.get('publication_year') > 1900})

// bookList.forEach((book) => {
//   console.log(`List One: ${book.get('title')} by ${book.get('author')}`)
// });
//
// newBooks.forEach((book) => {
//   console.log(`List two: ${book.get('title')} by ${book.get('author')}`)
// })

const updateHandler = (list) => {
  //do something
}

bookList.on('update', updateHandler)
// Starts undefined - we'll set this in $(document).ready
// once we know the template is available
let bookTemplate;

const render = function render(bookList) {
  const bookTemplate = _.template($('#book-template').html());
  const $bookList = $('#book-list');
  $bookList.empty();
  // bookList.forEach((book) => {
  //   $bookList.append(bookTemplate(book.attributes))
  // })
};
//get the element to append to the dom



//build a foreach loop of bookList
//append with the template to the dom


//
//
//
// const skinner = new Cat({
//   name: 'Skinner',
//   owner: 'Canaan',
//   birth_year: 2018,
// })
//
// console.log(skinner);
//
// const catList = new CatList();
// catList.add(skinner);
// catList.add({name: "thumble", owner: "Averi", birth_year: 1997});
// catList.add({name: "mittens", ownder:"Sam Jackson", birth_year: "2010"})
//
// console.log(catList)
// catList.forEach((cat) => console.log(`KITTEN: ${cat.get('name')}`))
//



//listening for a backbone event


// 1. create an event listener
// const bogusListener = function(event) {
//   console.log("Event occurred!");
//   console.log(event);
//   console.log(this);
// }
//
// // 2.
// bookList.on('bogus', bogusListener, bookList);
//
//
// // 3. Trigger the event
// bookList.trigger('bogus', 'Argument!');

// 4. optional: create an object that holds all of the events

const fields = ['title', 'author', 'publication_year']
const events = {
  addBook(event) {
    console.log("I want to add a book")
    event.preventDefault()
    const bookData = {};
    fields.forEach((field) => {
      const val = $(`input[name=${field}]`).val();
      if (val !== '') {
        bookData[field] = val;
      }
    });
    const book = new Book(bookData);
    console.log(book);

    if (book.isValid()) {
      console.log("SUCCESS")
      bookList.add(book);
      book.save({}, {
        success: events.successfulSave,
        error: events.failedSave,
      });
    } else {
      //client-side validations reported
      console.log("What's on book is invalid on the client side")
      console.log(book)
      $('#status-messages ul').append(`<li>Error returned by client-side validations! ${book.validationError['title']}</li>`);
      $('#status-messages').show();
    }
  },

  sortBooks(event) {
    $('.sort').removeClass('current-sort-field');
    const classes = $(this).attr('class').split(/\s+/);
    $(this).addClass('current-sort-field');
    if (bookList.comparator === classes[1]) {
      bookList.models.reverse();
      bookList.trigger(render(bookList));
    } else {
      bookList.comparator = classes[1];
      bookList.sort();
    }
  },

  successfulSave(book, response) {
    console.log('Success!')
    console.log(book);
    console.log(response);
    $('#status-messages ul').empty();
    $('#status-messages ul').append(`<li>${book.get('title')} added!!!!!!!!!!!!!!!!</li>`)
    $('#status-messages').show();
  },

  failedSave(book, response) {
    // console.log('Errrrrrrr');
    // console.log(book);
    // console.log(response);
    // console.log(response.responseJSON.errors);
    for (let key in response.responseJSON.errors) {
      response.responseJSON.errors[key].forEach((error) => {
        $('#status-messages ul').append(`<li>${key}: ${error}</li>`)
      })
    }
    $('#status-messages').show()
    book.destroy();
  }
}




$(document).ready(() => {
  bookTemplate = _.template($('#book-template').html());
  $('#add-book-form').submit(events.addBook);
  //
  $('.sort').click(events.sortBooks);
  bookList.on('update', render, bookList);
  bookList.on('sort', render, bookList);

  bookList.fetch();
});

//CID is the identifier for each instance of a models
