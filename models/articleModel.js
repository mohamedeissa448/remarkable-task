import {Schema, model, models }from 'mongoose';

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'An article must have a title'],
      unique: true,
      trim: true,
      maxlength: [40, 'An article title must have less or equal then 40 characters'],
      minlength: [5, 'An article title must have more or equal then 5 characters']
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'An article  must have a content'],
      maxlength: [40, 'An article title must have less or equal then 40 characters'],
      minlength: [5, 'An article title must have more or equal then 5 characters']

    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'User',
      required: [true, 'An article must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Article = models.article || model('article', articleSchema);

export default Article;
