import { writable } from "svelte/store";
import { firebaseFunctions } from '$lib/fb';
import { httpsCallable } from "firebase/functions";

let meetupsData = []

function getMeetups() {
  fetch('https://us-central1-tixa-scanner.cloudfunctions.net/getMeetups')
        .then(response => response.json())
        .then(data => {
          meetups.set(data);
        })
        .catch(err => {
          console.error(err.message);
        });
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
    const createMeetup = httpsCallable(firebaseFunctions, 'addMeetup');
    await createMeetup(newMeetup);
    getMeetups();
  },
  updateMeetup: async (id, meetupData) => {
    const updateMeetup = httpsCallable(firebaseFunctions, 'updateMeetup');
    const updateObject = {
      id,
      meetup: meetupData
    }
    await updateMeetup(updateObject)
    getMeetups();
  },
  removeMeetup: async id => {
    const deleteMeetup = httpsCallable(firebaseFunctions, 'deleteMeetup');
    await deleteMeetup({id});
    getMeetups();
  },
  toggleFavourite: async id => {
    const toggleFavourites = httpsCallable(firebaseFunctions, 'toggleFavourites');
    await toggleFavourites({id})
    getMeetups();
  }
}