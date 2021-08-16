/** @format */

import { useEffect, useState } from "react";
import { db } from "firebase/config";

const useFirestore = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let conditionRef = db.collection(collection).orderBy("createdAt");

    if (condition) {
      const { fieldName, operator, compareValue } = condition;
      if (!compareValue || !compareValue.length) {
        return;
      }
      conditionRef = conditionRef.where(fieldName, operator, compareValue);
    }

    const unsubscribe = conditionRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(data);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};

export default useFirestore;
