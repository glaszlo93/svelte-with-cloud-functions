<script>
    import MeetupDetail from '$lib/Meetups/MeetupDetail.svelte';
    import Header from '$lib/UI/Header.svelte';
    import { goto } from '$app/navigation';
    
    function closeDetails() {
        goto('/');
    }

</script>

<Header />
<MeetupDetail on:close={ closeDetails } />