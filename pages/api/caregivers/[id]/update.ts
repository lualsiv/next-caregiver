import { query as q } from 'faunadb';
import { guestClient } from '../../../../utils/fauna-client';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const { firstName, lastName, telephone } = req.body;

  try {
    await guestClient.query(
      q.Update(q.Ref(q.Collection('Caregiver'), id), {
        data: {
          firstName,
          lastName,
          telephone          
        },
      })
    );
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};