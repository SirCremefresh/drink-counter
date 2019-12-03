<script>
    import {etherService} from './ether.service'
    export let showRoute;

    let ranking = [];
    let player = {
        rank: 0,
        username: '',
        score: 0
    };

    (async () => {
        ranking = await etherService.getRanking();

        player = ranking.filter(r => r.username === localStorage.getItem('USERNAME'));

        player.rank = ranking.indexOf(player) + 1;
        console.log(player);
    })();
</script>

<main>
    <h2 class="subtitle has-text-centered ranking-subtitle">Ranking</h2>
    <label class="label margin-left">You're Score:</label>
    <table class="table is-fullwidth is-striped">
        <thead>
        <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Player</th>
            <th>Drinks drunk</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <th>{player.id}</th>
                <td>{player.username}</td>
                <td>{player.score}</td>
            </tr>
        </tbody>
    </table>

    <label class="label margin-left">Global Score:</label>
    <table class="table is-fullwidth is-striped">
        <thead>
        <tr>
            <th><abbr title="Position">Pos</abbr></th>
            <th>Player</th>
            <th>Drinks drunk</th>
        </tr>
        </thead>
        <tbody>
        {#each ranking as rank, i}
            <tr>
                <th>{i + 1}</th>
                <td>{rank.username}</td>
                <td>{rank.score}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</main>
<style>
    .ranking-subtitle {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .margin-left {
        margin-left: 5px;
    }
</style>
