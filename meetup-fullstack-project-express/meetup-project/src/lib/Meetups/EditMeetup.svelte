<script>
  import { createEventDispatcher } from 'svelte';

  import { customMeetupsStore } from './meetups-store';
  import TextInput from '$lib/UI/TextInput.svelte';
  import Button from '$lib/UI/Button.svelte';
  import Modal from '$lib/UI/Modal.svelte';
  import { isEmpty, isValidEmail } from '$lib/helpers/validatioin';

  export let id = null;

  
  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';
  let formIsValid = false;

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;
  
  if (id) {
    const unsubscribe = customMeetupsStore.subscribe(items => {
      const selectedMeetup = items.find(item => item.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.image;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      image: imageUrl,
      contactEmail: email,
      address: address
    }

    if (id) {
      customMeetupsStore.updateMeetup(id, meetupData);
    } else {
      customMeetupsStore.addMeetup(meetupData);
    }
    
    dispatch('save');
  }

  function cancel() {
    dispatch('cancel');
  }

  function deleteMeetup() {
    customMeetupsStore.removeMeetup(id);
    dispatch('save');
  }

</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault="{ submitForm }">
    <TextInput 
      id="title"
      label="Title"
      value={ title }
      valid={ !isEmpty(title) }
      on:input={ event => title = event.target.value }/>
    <TextInput 
      id="subtitle"
      label="Subtitle"
      value={ subtitle }
      valid={ !isEmpty(subtitle) }
      on:input={ event => subtitle = event.target.value }/>
    <TextInput 
      id="address"
      label="Address"
      value={ address }
      valid={ !isEmpty(address) }
      on:input={ event => address = event.target.value }/>
    <TextInput 
      id="imageUrl"
      label="ImageUrl"
      value={ imageUrl }
      valid={ !isEmpty(imageUrl) }
      on:input={ event => imageUrl = event.target.value }/>
    <TextInput 
      id="email"
      label="Email"
      value={ email }
      type="email"
      valid={ !isEmpty(email) }
      on:input={ event => email = event.target.value }/>
    <TextInput 
      id="description"
      label="Description"
      value={ description }
      controlType="textarea"
      valid={ !isEmpty(description) }
      on:input={ event => description = event.target.value }/>
    </form>
    <div slot="footer">
      <Button type="button" mode="outline" on:click="{ cancel }">Cancel</Button>
      <Button disabled={!formIsValid} type="button" on:click="{ submitForm }">Save</Button>
      {#if id}
        <Button type="button" on:click={ deleteMeetup }>Delete</Button>
      {/if}
    </div>
</Modal>