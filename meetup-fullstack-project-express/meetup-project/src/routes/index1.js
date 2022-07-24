export async function GET() {
  let loadedMeetups;
  const fetchResponse = await (await fetch('https://us-central1-tixa-scanner.cloudfunctions.net/api/meetups')).json();
  const responseData = await fetchResponse;

  loadedMeetups = responseData;

  if (loadedMeetups) {
    return {
      status: 200,
      body: { loadedMeetups }
    }
  }

  return {
    status: 404
  }
}