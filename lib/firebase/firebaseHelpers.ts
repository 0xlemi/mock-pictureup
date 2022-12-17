import { faker } from "@faker-js/faker";
import { collection, deleteDoc, doc, DocumentData, Firestore, getDocs, setDoc } from "firebase/firestore";

export async function getDocuments(db: Firestore, collectionName: string) {
  const modelColl = collection(db, collectionName);
  const snapshot = await getDocs(modelColl);

  const documents: { [x: string]: DocumentData; }[] = [];
  snapshot.forEach(doc => {
    const document = { [doc.id]: doc.data() };
    documents.push(document);
  });
  return documents;
}

export async function addDocument<T extends object>(db: Firestore, collectionName: string, factoryFunction: () => T, times = 1) {
  for (let i = 0; i < times; i++) {
    await setDoc(doc(db, collectionName, faker.datatype.uuid() ), factoryFunction());
  }
}

export async function deleteCollection(db: Firestore, collectionName: string) {
  const modelColl = collection(db, collectionName);
  const snapshot = await getDocs(modelColl);
  snapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}

