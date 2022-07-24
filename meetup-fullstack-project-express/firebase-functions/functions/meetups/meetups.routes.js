const express = require('express');
const router = express.Router();

const meetupsController = require('./meetups.controller');

router.post('/', (req, res, next) => {
  return meetupsController.createMeetup(req, res, next);
});

router.get('/', (req, res, next) => {
  return meetupsController.getMeetups(req, res, next);
});

router.put('/:id', (req, res, next) => {
  return meetupsController.updateById(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  return meetupsController.deleteById(req, res, next);
});

module.exports = router;