<script>
    export let showRoute;
    let ranking = [{name: "hans", drinks: 5}, {name: "don", drinks: 3}, {name: "globi", drinks: 1}];
</script>

<main>
    <h2 class="subtitle has-text-centered ranking-subtitle">Ranking</h2>
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
</style>
