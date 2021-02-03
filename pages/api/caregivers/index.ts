// pages/api/caregivers/index.ts

import { query as q } from 'faunadb';
import { guestClient } from '../../../utils/fauna-client';

export default async (req, res) => {
  try {
    const caregivers = await guestClient.query<any>(
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index('allCaregivers') // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );
    // ok
    
    res.status(200).json(caregivers.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};