const meetupsService = require('./meetups.service');

const admin = require('firebase-admin');

const meetupDb = admin.firestore().collection('meetups');

exports.createMeetup = async (req, res, next) => {
  try {
    const newMeetup = await meetupsService.createMeetup(req.body);

    res.status(201).json(newMeetup);
  } catch (err) {
    console.error(err);
  }
}

exports.getMeetups = async (req, res, next) => {
  try {
    const querySnapshot = await meetupsService.getMeetups();
    const responseArray = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });
    res.status(200).json(responseArray);
  } catch (err) {
    console.error(err.message);
  }
}

exports.updateById = async (req, res, next) => {
  try {
    let updatedItem = {};

    meetupDb.doc(req.params.id)
      .onSnapshot(async doc => {
        updatedItem = { ...doc.data(), id: req.params.id } 
      });
      
    await meetupsService.updateById(req.params.id, req.body);
    res.json(updatedItem);
  } catch (err) {
    res.status(500);
    console.error(err.message);
  }
}

exports.deleteById = async (req, res, next) => {
  try {
    await meetupsService.deletedById(req.params.id);

    res.status(200).json({});
  } catch (err) {
    console.error(err.message);
  }
}