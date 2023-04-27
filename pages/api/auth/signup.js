import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler.post(createUser);

async function createUser(req, res) {
  try {
    await dbConnect();
    await User.create(req.body);
    res.status(201).json({ message: 'New user was created successfully!' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export default handler;
