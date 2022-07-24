<script>
  import { createEventDispatcher } from 'svelte';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  
  import MeetupItem from './MeetupItem.svelte';
  import MeetupFilter from './MeetupFilter.svelte';
  import Button from '$lib/UI/Button.svelte';

  export let meetups;

  let favsOnly = false;

  const dispatch = createEventDispatcher();

  $: filteredMeetups = favsOnly ? meetups.filter(meetup => meetup.isFavourite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<style>
  #meetup-controls {
    margin: 1rem;
  }

  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select="{ setFilter }" />
  <Button on:click="{ () => dispatch('add') }">New Meetup</Button>
</section>
<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem 
        id = {meetup.id}
        title = { meetup.title }
        subtitle = { meetup.subtitle }
        description = { meetup.description }
        imageUrl = { meetup.image }
        address = { meetup.address }
        isFavourite = { meetup.isFavourite }
        on:show-details 
        on:edit/>
    </div>
  {/each}
</section>