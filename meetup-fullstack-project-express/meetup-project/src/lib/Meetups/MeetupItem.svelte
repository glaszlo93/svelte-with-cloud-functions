<script>
  import { createEventDispatcher } from 'svelte';
  import { customMeetupsStore } from './meetups-store';
  import Button from '$lib/UI/Button.svelte';
  import Badge from '$lib/UI/Badge.svelte';

  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let isFavourite;

  const dispatch = createEventDispatcher();
  
  function toggleFavourite() {
    customMeetupsStore.updateMeetup(id, { isFavourite: !isFavourite });
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
      { title } 
      {#if isFavourite}
        <Badge>FAVOURITE</Badge>
      {/if}
    </h1>
    <h2>{ subtitle }</h2>
    <p>{ address }</p>
  </header>
  <div class="image">
    <img src="{ imageUrl }" alt="">
  </div>
  <div class="content">
    <p>{ description }</p>
  </div>
  <footer>
    <Button mode="outline" type="button" on:click={ () => dispatch('edit', id) } >Edit</Button>
    <Button type="button" on:click={ () => dispatch('show-details', id) } >Show details</Button>
    <Button 
      mode="outline" 
      color={ isFavourite ? null : 'success' }
      type="button" 
      on:click="{ toggleFavourite }">
        { isFavourite ? 'Unfavourite' : 'Favourite' }
    </Button>
  </footer>
</article>