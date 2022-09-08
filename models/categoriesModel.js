const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  label: {
    type: 'string',
    required: true,
  },

  slug: {
    type: 'string',
    unique: true,
  },

  // Associations
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Questions',
  }],
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

module.exports = mongoose.model('Categories', CategoriesSchema);