import Book from '../../../models/book';
import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';
import { hasTokenMiddleware } from '../../../utils/checkUser';
handler.use(hasTokenMiddleware).post(saveBooks);
handler.use(hasTokenMiddleware).delete(unSaveBooks);
handler.use(hasTokenMiddleware).get(getSavedBooks);

async function saveBooks(req, res) {
  const userId = req.query.id[0];
  const bookdId = req.body.bookId;
  try {
    dbConnect();
    await Book.create(req.body);
    await User.updateOne(
      { _id: userId },
      { $addToSet: { savedBooks: bookdId } } // used addToSet instead of
    );

    return res.status(200).json({ message: 'Book Saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getSavedBooks(req, res) {
  const userId = req.query.id[0];
  try {
    await dbConnect();
    const books = await Book.find({ ownerId: userId });
    if (books) return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function unSaveBooks(req, res) {
  const userId = req.query.id[0];
  const bookId = req.query.id[1];
  try {
    dbConnect();
    await User.updateOne({ _id: userId }, { $pull: { savedBooks: bookId } });
    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({ message: 'Book unsaved successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
