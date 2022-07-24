<script>
    import MeetupDetail from '$lib/Meetups/MeetupDetail.svelte';
    import { goto } from '$app/navigation';
    
    function closeDetails() {
        goto('/');
    }

</script>

<MeetupDetail on:close={ closeDetails } />