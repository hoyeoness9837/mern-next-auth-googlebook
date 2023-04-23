import Book from '../../../models/book';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler.delete(deleteBooks);

async function deleteBooks(req, res) {
  try {
    await dbConnect();
    await Book.findByIdAndDelete(req.query.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
