import db from '../const/db';
import formatDateFields from '../helpers/formatDateFields';

const collection = db.collection('pinQueue');

export const createQueue = async data => {
  return collection.add(data);
};

export const getReadyQueue = async (userId = '') => {
  let docRef = userId ? collection.where('userId', '==', userId) : collection;
  docRef = docRef.where('pinsAt', '<', new Date());
  const docs = await docRef.get();
  return docs.docs.map(doc => ({id: doc.id, ...formatDateFields(doc.data())}));
};
