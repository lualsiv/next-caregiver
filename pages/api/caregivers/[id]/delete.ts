import { query as q } from 'faunadb';
import { guestClient } from '../../../../utils/fauna-client';

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  try {
    await guestClient.query(q.Delete(q.Ref(q.Collection('Caregiver'), id)));
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};