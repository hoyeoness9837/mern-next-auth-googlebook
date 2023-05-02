import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import User from '../../../models/user';
import dbConnect from '../../../utils/dbConnect';

export default NextAuth({
  // adapter: MongoDBAdapter(dbConnect.instance),
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
        dbConnect();
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
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
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
      }
      return session;
    },
  },
  // events: {
  //   async signIn(message) {
  //     /* on successful sign in */
  //   },
  //   async signOut(message) {
  //     /* on signout */
  //   },
  //   async createUser(message) {
  //     /* user created */
  //   },
  //   async updateUser(message) {
  //     /* user updated - e.g. their email was verified */
  //   },
  //   async linkAccount(message) {
  //     /* account (e.g. Twitter) linked to a user */
  //   },
  //   async session(message) {
  //     /* session is active */
  //   },
  // },
});
