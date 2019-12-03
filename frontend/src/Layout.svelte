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
    <div class="layout-header">
        <h1 class="title has-text-centered layout-title">DRINK COUNTER V5</h1>
    </div>

    <div class="app-content scroll-content">
        <slot></slot>
    </div>
    <div class="tabs">
        <div class="trophy" on:click={showRouteRanking}>
            <i class="ion-md-podium icon"></i>
        </div>
        <div class="qrcode" on:click={showRouteScanner}>
            <i class="ion-md-qr-scanner icon"></i>
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

        position: fixed;
        bottom: calc(var(--vh, 1vh) * 100);
        top: calc(var(--vh, 1vh) * 100 - 46px);
        left: 0;
        z-index: 100;
        right: 0;
        height: 64px;

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

    .icon {
        position: relative;
        top: 5px;
        font-size: 40px;
    }

    .qrcode {
        grid-column: 2;
        place-self: center;
        color: #363636;

        height: calc(100% - 10px);
        width: auto;
    }

    .layout-header {
        background-color: #00d1b2;
    }

    .layout-title {
        margin-top: 10px;
    }

    .scroll-content {
        overflow: scroll;
        -webkit-overflow-scroll: touch;
    }
</style>