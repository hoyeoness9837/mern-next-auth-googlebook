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
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/new-user',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
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
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        return session;
      }
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
