import { getFirestore } from 'firebase/firestore'
import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next'
import firebase from '../../../lib/firebase/clientApp'
import { addDocument, getDocuments } from '../../../lib/firebase/firebaseHelpers';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const db = getFirestore(firebase)

  await addDocument<DiffusionModel>(db, 'DiffusionModel', diffiusonModelFactory, 10);

  const models = await getDocuments(db, 'DiffusionModel');
  res.status(200).json(models)
}

type DiffusionModel = {
  name: string;
  description: string;
  image: string;
  isFavorite: boolean;
}

const diffiusonModelFactory = (): DiffusionModel => {
  return {
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(3),
    image: faker.image.imageUrl(),
    isFavorite: faker.datatype.boolean()
  };
}

export default handler
