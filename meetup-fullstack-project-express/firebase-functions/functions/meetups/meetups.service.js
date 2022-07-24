const admin = require('firebase-admin');

admin.initializeApp();

const meetupDb = admin.firestore().collection('meetups');

exports.createMeetup = newMeetup => meetupDb.add(newMeetup);

exports.getMeetups = () => meetupDb.get();

exports.updateById = (id, updatedMeetup) => meetupDb.doc(id).update(updatedMeetup);

exports.deletedById = id => meetupDb.doc(id).delete();