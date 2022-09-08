import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({
  question: {
    type: 'string',
    required: true,
  },

  answers: {
    type: 'array',
    required: true,
  },

  // Associations
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Categories',
  }],
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  }
);

module.exports = mongoose.model('Questions', QuestionsSchema);
