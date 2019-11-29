<script>
    export let showRoute;
</script>

<div class="container">
    <h1 class="title">DRINK COUNTER</h1>
    <div class="app-content">
        <slot></slot>
    </div>
    <div class="tabs">

    </div>
</div>

<style>
    .container {
        height: 100%;
        display: grid;
        grid-template-rows: 60px 1fr 80px;
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
        grid-area: tabs;
        background-color: #00d1b2;
        margin: 0;
    }
</style>