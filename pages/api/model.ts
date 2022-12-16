import { collection, Firestore, getDocs, getFirestore } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../lib/firebase/clientApp'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore(firebase)
  const models = await getModels(db);
  res.status(200).json({"models": models})
}

async function getModels(db: Firestore) {
  const modelColl = collection(db, 'DiffusionModel');
  const modelSnapshot = await getDocs(modelColl);
  const modelList = modelSnapshot.docs.map(doc => doc.data());
  return modelList;
}

export default handler
