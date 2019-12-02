<script>
    export let showRoute;
    let ranking = [{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1},{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1}];
    let player = {name: "you", rank:"2alcoholic"};
</script>

<main class="scroll-content">
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
                <th>{999}</th>
                <td>{player.name}</td>
                <td>{player.rank}</td>
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
                <td>{rank.name}</td>
                <td>{rank.drinks}</td>
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

    .scroll-content {
        overflow-y: scroll;
        height: calc(100vh - 110px);
    }
</style>
