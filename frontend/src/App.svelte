<script>
    import 'bulma/css/bulma.css'
    import '@fortawesome/fontawesome-free/css/all.css'

    import Register from "./Register.svelte";
    import Scanner from "./Scanner.svelte";
    import Ranking from "./Ranking.svelte";
    import Layout from "./Layout.svelte";
    import {etherService} from './ether.service'

    const username = localStorage.getItem("USERNAME");

    let route = (username) ? 'RANKING' : 'REGISTER';

    etherService.initialize();

    const showRoute = (newRoute) => {
        console.log(`change route to ${newRoute}`);
        route = newRoute;
    }
</script>

{#if route === 'REGISTER'}
    <Register showRoute={showRoute}/>
{:else}
    <Layout showRoute={showRoute}>
        {#if route === 'SCANNER'}
            <Scanner showRoute={showRoute}/>
        {:else if route === 'RANKING'}
            <Ranking showRoute={showRoute}/>
        {/if}
    </Layout>
{/if}

<style>
</style>
