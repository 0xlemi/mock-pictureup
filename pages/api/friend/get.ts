import { NextApiRequest, NextApiResponse } from 'next'

import firebase from '../../../lib/firebase/clientApp'
import { getFirestore } from 'firebase/firestore';
import { getDocuments } from '../../../lib/firebase/firebaseHelpers';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore(firebase)
  const models = await getDocuments(db, 'Friend');
  res.status(200).json(models)
}
export default handler