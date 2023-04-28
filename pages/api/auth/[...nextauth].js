import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          dbConnect();
          const user = await User.findOne({ email: credentials.email }).select(
            '+password'
          );
          const isPasswordValid = await user.comparePassword(
            credentials.password
          );
          if (!isPasswordValid) return null;
          return user;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
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
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
        return session;
      } else {
        return null;
      }
    },
  },
  pages: {
    signIn: '/login',
  },
});
