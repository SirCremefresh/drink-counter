<script>
    export let showRoute;

    function register() {

    }

</script>

<main>
    <div class="section">
        <div class="box">
            <h1 class="title has-text-centered">Register</h1>
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" placeholder="bert" data-el="register-username-input" type="text">
                    <span class="icon is-small is-left">
                    <i class="ion-md-person"></i>
                </span>
                </div>
                <p class="help is-danger is-hidden">This username is taken</p>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary is-rounded is-fullwidth" on:click={register} data-el="register-button">Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 90vh;
    }
</style>