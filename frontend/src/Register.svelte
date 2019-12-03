<script>
    import {etherService} from './ether.service';

    export let showRoute;
    let username = '';
    let errorMessage = '';

    etherService.initialize();

    async function register() {
        if (username.length < 3) {
            errorMessage = 'The Username needs to be at least 3 characters';
            return;
        }
        if (username.length > 25) {
            errorMessage = 'The Username can\'t be longer than 25 characters';
            return;
        }
        if (await etherService.isUsernameTaken(username)) {
            errorMessage = 'The username is already taken';
            return
        }

        errorMessage= '';
        await etherService.register(username);
    }

</script>

<main>
    <div class="section">
        <div class="box">
            <h1 class="title has-text-centered">Register V4</h1>
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input bind:value={username} class="input" placeholder="bert" data-el="register-username-input"
                           type="text">
                    <span class="icon is-small is-left">
                    <i class="ion-md-person"></i>
                </span>
                </div>
                {#if errorMessage !== ''}
                    <p class="help is-danger">{errorMessage}</p>
                {/if}
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary is-rounded is-fullwidth" on:click={register}
                            data-el="register-button">Register
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