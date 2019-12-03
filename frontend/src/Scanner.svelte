<script>
    export let showRoute;

    import jsQR from "jsqr";
    import {etherService} from './ether.service';
    import {onDestroy} from 'svelte';


    let canvas, ctx, innerWidth, height, stopTick = false;
    let countDown = '';

    const video = document.createElement('video');

    const nextScan = +localStorage.getItem("NEXT_SCAN");
    const canScan = new Date().getTime() >= nextScan;

    if (canScan) {
        setTimeout(() => {
            initializeCamera();
        }, 500);
    } else {
        const intervalId = setInterval(() => {
            if (stopTick) {
                clearInterval(intervalId);
                return;
            }
            countDown = Math.floor((nextScan - new Date().getTime()) / 1000);
            if (countDown <= 0) {
                initializeCamera();
                clearInterval(intervalId);
            }
        }, 500);
    }

    async function initializeCamera() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: innerWidth,
                height: height,
                facingMode: "environment"
            }
        });

        if (stopTick) return;
        ctx = canvas.getContext("2d");

        video.srcObject = stream;
        video.setAttribute("playsinline", 'true'); // required to tell iOS safari we don't want fullscreen
        video.play();
        requestAnimationFrame(tick);
    }

    function tick() {
        if (stopTick) return;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.hidden = false;

            canvas.height = height;
            canvas.width = innerWidth;
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.drawImage(video, (video.width - innerWidth) / 2, 0);
            ctx.drawImage(video, 0, (canvas.height - video.videoHeight) / 2);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                let barId = parseInt(code.data.substring(0, 1));
                if (barId >= 0 && barId <= 6) {
                    etherService.increment(barId);
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
        if (!video.srcObject) return;
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
    <div class="countdown">{countDown}</div>
</main>
<style>
    main {
        height: calc(100% - 25px);
        background: black;
    }

    .countdown {
        color: white;
        text-align: center;
        font-size: 100px;
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