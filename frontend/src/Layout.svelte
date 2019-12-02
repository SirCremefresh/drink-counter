<script>
    export let showRoute;

    function showRouteRanking() {
        showRoute("RANKING")
    }

    function showRouteScanner() {
        console.log("hello")
        showRoute("SCANNER")
    }
</script>

<div class="container">
    <h1 class="title">DRINK COUNTER</h1>
    <div class="app-content">
        <slot></slot>
    </div>
    <div class="tabs">
        <div class="trophy" on:click={showRouteRanking}>
            <i class="fas fa-trophy"></i>
        </div>
        <div class="qrcode" on:click={showRouteScanner}>
            <i class="fas fa-qrcode"></i>
        </div>
    </div>
</div>

<style>
    .container {
        height: 100%;
        display: grid;
        grid-template-rows: 60px 1fr 50px;
        grid-template-areas: "title" "content" "tabs";
    }

    .title {
        grid-area: title;
        place-self: center;
        margin-bottom: 5px !important;
    }

    .app-content {
        display: block;
        height: 100%;
        grid-area: content;
        margin: 0;
    }

    .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;


        grid-area: tabs;
        background-color: #00d1b2;
        margin: 0;
    }

    .trophy {
        grid-column: 1;
        place-self: center;
        color: #363636;

        height: calc(100% - 10px);
        width: auto;
    }

    .fa-trophy, .fa-qrcode {
        font-size: 40px;
    }

    .qrcode {
        grid-column: 2;
        place-self: center;
        color: #363636;

        height: calc(100% - 10px);
        width: auto;
    }
</style>