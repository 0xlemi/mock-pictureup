import { getFirestore } from 'firebase/firestore'
import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../../lib/firebase/clientApp'
import { addDocument, getDocuments } from '../../../lib/firebase/firebaseHelpers';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore(firebase)

  await addDocument<Friend>(db, 'Friend', friendFactory, 10);

  const models = await getDocuments(db, 'Friend');
  res.status(200).json(models)
}

type Friend = {
  name: string;
  image: string;
}

const friendFactory = (): Friend => {
  return {
    name: faker.name.firstName(),
    image: faker.image.imageUrl(),
  };
}

export default handler
