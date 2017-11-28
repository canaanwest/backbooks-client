import Backbone from 'backbone';
import Cat from '../models/cat';

const CatList = Backbone.Collection.extend({
  model: Cat
})

export default CatList;
