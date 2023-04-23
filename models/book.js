import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  imageLinks: String,
  previewLink: String,
  bookId: String,
  isSaved: {
    type: Boolean,
    default: false,
  },
  savedAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
});

export default mongoose.models?.Book || mongoose.model('Book', bookSchema);
