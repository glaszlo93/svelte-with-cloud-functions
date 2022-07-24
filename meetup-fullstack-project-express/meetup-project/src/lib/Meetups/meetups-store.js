import { writable } from "svelte/store";

let meetupsData = []

async function getMeetups() {
  try {
    const fetchResponse = await fetch('https://us-central1-tixa-scanner.cloudfunctions.net/api/meetups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await fetchResponse.json();
    meetups.set(responseData);
  } catch (err) {
    console.error(err);
  }
}

getMeetups();

const meetups = writable(meetupsData);

export const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: async meetupData => {
    const newMeetup = {
      ...meetupData,
      isFavourite: false
    }
    try {
      await fetch(`https://us-central1-tixa-scanner.cloudfunctions.net/api/meetups`, {
        method: 'POST',
        body: JSON.stringify(newMeetup),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getMeetups();
    } catch (err) {
      console.error(err.message);
    }
  },
  updateMeetup: async (id, meetupData) => {
    try {
      await fetch(`https://us-central1-tixa-scanner.cloudfunctions.net/api/meetups/${id}`, {
        method: 'PUT',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      getMeetups();
    } catch (err) {
      console.error(err.message);
    }
  },
  removeMeetup: async id => {
    try {
      await fetch(`https://us-central1-tixa-scanner.cloudfunctions.net/api/meetups/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      console.error(err);
    }
    getMeetups();
  }
}