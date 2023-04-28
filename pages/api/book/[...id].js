import Book from '../../../models/book';
import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';
handler.post(saveBooks);
handler.delete(unSaveBooks);
handler.get(getSavedBooks);

async function saveBooks(req, res) {
  const { userId } = req.query;
  const bookdId = req.body.bookId;
  try {
    await dbConnect();
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
  const { userId } = req.query;
  try {
    await dbConnect();
    const books = await Book.find({ ownerId: userId });
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function unSaveBooks(req, res) {
  const { userId, bookId } = req.query;
  try {
    await dbConnect();
    await User.updateOne({ _id: userId }, { $pull: { savedBooks: bookId } });
    await Book.findByIdAndDelete(bookId);
    return res.status(200).json({ message: 'Book unsaved successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
