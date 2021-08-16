/** @format */

import firebase, { db } from "./config";

export const addDocument = async (collection, data) => {
  const query = db.collection(collection);

  const status = await query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
