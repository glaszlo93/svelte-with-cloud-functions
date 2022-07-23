import functions from 'firebase-functions';
import admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const corsOrigin = cors({ origin: true });
const meetupDb = admin.firestore().collection('meetups');

export const addMeetup = functions.https.onCall((data, context) => {
  return meetupDb.add(data);
});

export const getMeetups = functions.https.onRequest(async (req, res) => {
  corsOrigin(req, res, async () => {
    const snapshot = await meetupDb.get();
    const responseArray = snapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });

    return res.status(200).json(responseArray);
  });
});

export const updateMeetup = functions.https.onCall(async (data, context) => {
  return meetupDb.doc(data.id).update(data.meetup);
});

export const deleteMeetup = functions.https.onCall(async (data, context) => {
  meetupDb.doc(data.id).delete();
});

export const toggleFavourites = functions.https.onCall(async (data, context) => {
  let selectedMeetup = {}
  const selectedMeetupRef = meetupDb.doc(data.id);
  const doc = await selectedMeetupRef.get();

  selectedMeetup = doc.data();
  selectedMeetup.isFavourite = !selectedMeetup.isFavourite;

  return selectedMeetupRef.update(selectedMeetup);
});
