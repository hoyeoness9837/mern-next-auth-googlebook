import Book from '../../models/book';
import dbConnect from '../../utils/dbConnect';
import handler from '../../utils/handler';

handler.post(createBooks);
handler.get(getBooks);

async function createBooks(req, res) {
  try {
    await dbConnect();
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

async function getBooks(req, res) {
  try {
    await dbConnect();
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


export default handler;
