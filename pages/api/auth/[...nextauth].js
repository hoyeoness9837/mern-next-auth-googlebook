import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';

const credentialsProvider = CredentialsProvider({
  name: 'credentials',
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: credentials.email }).select(
        '+password'
      );
      if (!user) {
        throw new Error('No user with a matching email was found.');
      }
      const pwValid = await user.comparePassword(credentials.password);
      if (!pwValid) {
        throw new Error('Your password is invalid');
      }
      return user;
    } catch (error) {
      console.error(error);
    }
  },
});

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [credentialsProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
