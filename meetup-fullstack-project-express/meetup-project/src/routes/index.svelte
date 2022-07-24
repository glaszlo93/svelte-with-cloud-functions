<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';  
  
  import { customMeetupsStore } from '$lib/Meetups/meetups-store';
  import Header from '$lib/UI/Header.svelte';
  import MeetupGrid from '$lib/Meetups/MeetupGrid.svelte';
  import EditMeetup from '$lib/Meetups/EditMeetup.svelte';

  $: loadedMeetups = customMeetupsStore;
  // export let loadedMeetups;

  let editMode = '';
  let editedId = '';
  let page = 'overview';
  let pageData = {}

  function savedMeetup() {
    editMode = '';
    editedId = '';
  }

  function cancelEdit() {
    editMode = '';
    editedId = '';
  }

  function showDetails(event) {
    page = 'details';
    pageData.id = event.detail;
    goto(`${event.detail}`);
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if editMode === 'edit' }
    <EditMeetup id="{ editedId }" on:save="{ savedMeetup }" on:cancel="{ cancelEdit }" />
  {/if}
  <MeetupGrid 
    meetups = { $loadedMeetups } 
    on:show-details={ showDetails } 
    on:add={ () => editMode = 'edit' }
    on:edit={ startEdit } />
</main>