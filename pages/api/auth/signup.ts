import { query as q } from 'faunadb';
import { guestClient } from '../../../utils/fauna-client';
import { setAuthCookie } from '../../../utils/auth-cookies';

export default async function signup(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and Password not provided');
  }

  try {
    const existingEmail = await guestClient.query(
      // Exists returns boolean, Casefold returns normalize string
      q.Exists(q.Match(q.Index('users_by_email'), q.Casefold(email)))
    );

    if (existingEmail) {
      return res.status(400).send(`Email ${email} already exists`);
    }

    const user = await guestClient.query<any>(
      q.Create(q.Collection('users'), {
        credentials: { password },
        data: { email },
      })
    );

    if (!user.ref) {
      return res.status(404).send('user ref is missing');
    }

    const auth = await guestClient.query<any>(
      q.Login(user.ref, {
        password,
      })
    );

    if (!auth.secret) {
      return res.status(404).send('auth secret is missing');
    }

    setAuthCookie(res, auth.secret);
    // Cookies.set('token', token, { expires: 60 })

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(error.requestResult.statusCode).send(error.message);
  }
}
