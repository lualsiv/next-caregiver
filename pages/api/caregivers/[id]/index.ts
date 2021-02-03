// pages/api/caregivers/[id]/index.js

import { query as q } from 'faunadb';
import { guestClient } from '../../../../utils/fauna-client';

export default async (req, res) => {
  console.log(req);
  const {
    query: { id },
  } = req;

  console.log(id);
  try {
    const customer = await guestClient.query<any>(
      q.Get(q.Ref(q.Collection('Caregiver'), id))
    );
    res.status(200).json(customer.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};