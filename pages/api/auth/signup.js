import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';
import handler from '../../../utils/handler';

handler.post(createUser);

async function createUser(req, res) {
  try {
    await dbConnect();
    const { email, password } = req.body;
    const query = User.where({ email: email });
    const user = await query.findOne();
    if (user) {
      return res.status(400).json({ message: 'The email already exists.' });
    } else {
      await User.create(req.body);
      return res.status(200).json({ message: 'new user created.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default handler;
