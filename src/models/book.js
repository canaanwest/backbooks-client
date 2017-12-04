import Backbone from 'backbone';

const Book = Backbone.Model.extend({
  url: 'http://localhost:3000/books',
  defaults: {
    author: "Unknown",
  },

  initialize: function(attributes) {
    console.log(`In initialize for the book ${this.get('title')}`);
    console.log(attributes);
  },

  validate: function(attributes) {
    console.log("what are the attributes?? Here: \n" + attributes);

    const errors = {}

    if (!attributes.title) {
      errors['title'] = "Title cannot be blank";
    }

    if (!attributes.author) {
      errors['author'] = "Author cannot be blank";
    }

    if (!attributes.publication_year) {
      errors['publication_year'] = "Publication Year cannot be blank"
    }

    if (isNaN(parseInt(attributes.publication_year))) {
      errors['publication_year'] = "Publication Year must be a number"
    }

    if (parseInt(attributes.publication_year) > 1000 || parseInt(attributes.publication_year) < 2018) {
      errors['publication_year'] = "Publication Year must be between 1000 and 2018"
    }

    // console.log(errors);
    if (Object.keys(errors).length > 0) {
      console.log(errors)
      return errors;
    } else {
      console.log(false);
      return false;
    }
  },

  age: function(){
    const currentYear = (new Date()).getFullYear();
    return currentYear - this.get('publication_year');
  },

  toString: function() {
    return `${this.get('title')} by ${this.get('author')}`;
  },
});

export default Book;


// Models in Backbone talk to the API.
// we made a capital B Book because it's defining a type of data
// export Book makes the file return Book when it's called upon.
