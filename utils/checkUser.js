import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

// UTILS
async function getTokenFromReq(req) {
  const token = await getToken({ req, secret });
  return token;
}

// CHECKING FUNCTIONS
export async function hasToken(req) {
  const token = await getTokenFromReq(req);
  return Boolean(token);
}

export async function isAdmin(req) {
  const token = await getTokenFromReq(req);
  return Boolean(token && token.user.role === 'admin');
}

// API MIDDLEWARE
export async function hasTokenMiddleware(req, res, next) {
  const token = await getTokenFromReq(req);
  if (!token) {
    return next(new Error('Not Allowed - Not logged in'));
  }
  next();
}

export async function isAdminMiddleware(req, res, next) {
  const token = await getTokenFromReq(req);
  if (!token || token.user.role !== 'admin') {
    return next(new Error('Not Allowed - Not admin'));
  }
  next();
}
