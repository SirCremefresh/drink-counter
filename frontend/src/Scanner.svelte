<script>
    export let showRoute;

    import jsQR from "jsqr";
    import uuid from "uuid/v4";
    import {onDestroy} from 'svelte';


    let canvas, ctx, innerWidth, height, stopTick = false;

    const video = document.createElement('video');

    setTimeout(() => {
        console.log({innerWidth, height});

        navigator.mediaDevices.getUserMedia({
            video: {
                width: innerWidth,
                height: height,
                facingMode: "environment"
            }
        }).then(function (stream) {
            ctx = canvas.getContext("2d");

            video.srcObject = stream;
            video.setAttribute("playsinline", 'true'); // required to tell iOS safari we don't want fullscreen
            video.play();
            requestAnimationFrame(tick);
        });
    }, 1000);


    function tick() {
        if (stopTick) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.hidden = false;

            canvas.height = height;
            canvas.width = innerWidth;
            // ctx.drawImage(video, (video.width - innerWidth) / 2, 0);
            ctx.drawImage(video, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                let barId = parseInt(code.data.substring(0, 1));
                if (barId >= 0 && barId <= 6) {
                    let newPwd = uuid();
                    // simpleCounter.increment(
                    //         web3.utils.fromUtf8(localStorage.getItem("USERNAME")),
                    //         barId,
                    //         web3.utils.fromUtf8(localStorage.getItem("PWD")),
                    //         web3.utils.keccak256(newPwd),
                    //         {from: process.env.PUBLIC_ADDRESS}
                    // );
                    // localStorage.setItem("PWD", `${newPwd}`);
                    stopCamera();
                    showRoute('RANKING');
                    return;
                } else {
                    // TODO: error msg wrong qrCode
                }
            }
        }
        requestAnimationFrame(tick);
    }

    function stopCamera() {
        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    onDestroy(() => {
        stopTick = true;
        stopCamera();
    });
</script>

<svelte:window bind:innerWidth={innerWidth}/>
<h2 class="subtitle has-text-centered rainbow rainbow_text_animated">Scan a QR-Code</h2>

<main bind:clientHeight={height}>
    <canvas
            bind:this={canvas}
            id="canvas" class="canvas"
            hidden
    ></canvas>
</main>
<style>
    main {
        height: calc(100% - 25px);
    }

    .subtitle {
        margin-bottom: 0 !important;
        color: #fefefe !important;
    }

    .canvas {
        margin: 0;
        padding: 0;
        display: block;
    }
</style>