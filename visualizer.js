$(document).ready(function() {
    const animations = {
        "Circle Bar": function(data) {
            canvas.prop('width', window.innerWidth)
            canvas.prop('height', window.innerHeight)

            let height = canvas.prop('height'),
                width = canvas.prop('width'),
                centerX = width / 2,
                centerY = height /2,
                radius = 150,
                bars = 200,
                barWidth = 2,
                gradient = canvasContext.createLinearGradient(0, 0, 0, height);

            for (let i = bars - 30; i < bars; i++) {
                gradient.addColorStop(0, "rgba(" + data[i] + ", " + data[i] + ", 77, 1)");
                gradient.addColorStop(1, "rgba(" + data[i] + ", " + data[i] + ", 51, 1)");
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, width, height);
            }

            for (let i = bars - 60; i < bars; i++) {
                // High Pass
                canvasContext.beginPath();
                canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                canvasContext.stroke();
            }

            for (let i = 0; i < bars - 90; i++) {
                let radians = Math.PI * 2 / (bars - 90),
                    barHeight = data[i] * 0.7,
                    xStart = centerX + Math.cos(radians * i) * radius,
                    yStart = centerY + Math.sin(radians * i) * radius,
                    xEnd = centerX + Math.cos(radians * i) * (radius + barHeight),
                    yEnd = centerY + Math.sin(radians * i) * (radius + barHeight),
                    lineColor = 'rgb(' + data[i] + ', ' + data[i] + ', ' + 205 + ')';

                // Normal Pass
                canvasContext.strokeStyle = lineColor;
                canvasContext.lineWidth = barWidth;
                canvasContext.beginPath();
                canvasContext.moveTo(xStart, yStart);
                canvasContext.lineTo(xEnd, yEnd);
                canvasContext.stroke();
            }
        },
        "boombox": function(data){
            canvas.prop('width', window.innerWidth)
            canvas.prop('height', window.innerHeight)

            let height = canvas.prop('height'),
                width = canvas.prop('width'),
                centerX = width / 2,
                centerY = height /2,
                radius = 150,
                bars = 200,
                barWidth = 2,
                gradient = canvasContext.createLinearGradient(0, 0, 0, height);

            //colors the background
            for (let i = bars - 30; i < bars; i++) {
                gradient.addColorStop(0, "rgba(" + data[i] + ", " + data[i] + ", 77, 1)");
                gradient.addColorStop(1, "rgba(" + data[i] + ", " + data[i] + ", 51, 1)");
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, width, height);
            }

            //creates boombox
            for(let i = bars - 60; i < bars; i++){
                canvasContext.fillStyle = 'gray';
                canvasContext.beginPath();
                canvasContext.rect(centerX-550, centerY-250, 900,500);
                canvasContext.stroke();
                canvasContext.fill();
            }


            //left speaker
            for(let i = bars - 60; i < bars; i++){
                canvasContext.fillStyle = 'black';
                canvasContext.beginPath();
                canvasContext.arc(centerX-400, centerY, 125, 0, 2 * Math.PI);
                canvasContext.stroke();
                canvasContext.fill();
            }

            //right speaker
            for(let i = bars - 60; i < bars; i++){
                canvasContext.fillStyle = 'black';
                canvasContext.beginPath();
                canvasContext.arc(centerX+200, centerY, 125, 0, 2 * Math.PI);
                canvasContext.stroke();
                canvasContext.fill();
            }

            //center rectangle(tape deck)
            for(let i = bars - 60; i < bars; i++){
                canvasContext.strokeStyle = '#595959';
                canvasContext.beginPath();
                canvasContext.rect(centerX - 220, centerY , 250,150);
                canvasContext.stroke();
            }

            //tape rectangle
            for(let i = bars - 60; i < bars; i++){
                canvasContext.fillStyle = 'black';
                canvasContext.beginPath();
                canvasContext.rect(centerX - 195, centerY + 25 , 200,100);
                canvasContext.stroke();
                canvasContext.fill();
            }

            //tape circle right
            for(let i = bars - 60; i < bars; i++){
                canvasContext.strokeStyle = 'gray';
                canvasContext.beginPath();
                canvasContext.arc(centerX - 50 , centerY + 80 , 5, 0, 2 * Math.PI);
                canvasContext.stroke();
            }

            //tape circle right
            for(let i = bars - 60; i < bars; i++){
                canvasContext.strokeStyle = 'gray';
                canvasContext.beginPath();
                canvasContext.arc(centerX - 135 , centerY + 80 , 5, 0, 2 * Math.PI);
                canvasContext.stroke();
            }

            //handle
            for(let i = bars - 60; i < bars; i++){
                canvasContext.lineWidth = 30;
                canvasContext.strokeStyle = 'gray';
                canvasContext.beginPath();
                canvasContext.rect(centerX - 275 , centerY - 325 , 350,200);
                canvasContext.stroke();
            }

            //buttons under tape deck
            centerX = centerX - 220;
            for(let j = 0; j < 5; j++){
                for(let i = bars - 60; i < bars; i++){
                    canvasContext.lineWidth = 1;
                    canvasContext.strokeStyle = 'gray';
                    canvasContext.beginPath();
                    canvasContext.rect(centerX, centerY + 200 , 40,40);
                    canvasContext.stroke();
                    canvasContext.fill();
                }
                centerX = centerX + 50;
            }


            //right speaker moving circle
            centerX = width / 2;
            for(let i = 0; i < bars; i++){
                canvasContext.strokeStyle = "white";
                canvasContext.beginPath();
                canvasContext.arc(centerX + 200 , centerY, data[i] * 0.5, 0 , 2 * Math.PI);
                canvasContext.stroke();
            }

            //left speaker moving circle
            for(let i = 0; i < bars; i++){
                canvasContext.strokeStyle = "white";
                canvasContext.beginPath();
                canvasContext.arc(centerX - 400 , centerY, data[i] * 0.5, 0 , 2 * Math.PI);
                canvasContext.stroke();
            } 
        }
    };
    let sideBtn = $('#side-btn'),
        sidePanel = $('#side-panel'),
        rightArrow = $('#right-arrow'),
        leftArrow = $('#left-arrow'),
        currentFunc = $('.current-function'),
        volumeControl = $('#volume-control'),
        audio = $('audio'),
        canvas = $('#display'),
        audioContext = new (AudioContext || webkitAudioContext)(),
        canvasContext = canvas.get(0).getContext('2d');
        intialGradient = canvasContext.createLinearGradient(0, 0, 0, canvas.prop('height')),
        animationFuncs = Object.keys(animations);
        currentIdx = 0;

    $('body').prop('scroll', "no");
    $('body').addClass('no-scroll');
    canvas.prop('width', window.innerWidth);
    canvas.prop('height', window.innerHeight);
    intialGradient.addColorStop(0, "rgba(0, 0, 77, 1)");
    intialGradient.addColorStop(1, "rgba(0, 0, 51, 1)");
    canvasContext.fillStyle = intialGradient;
    canvasContext.fillRect(0, 0, canvas.prop('width'), canvas.prop('height'));
    currentFunc.text(animationFuncs[currentIdx]);

    // Handles playing audio on fresh load
    if (audioContext.state === 'suspended') {
        let playButton = $('<button class="play-button btn btn-primary">Play</button>');

        playButton.click(function(e) {
            audioContext.resume();
            playButton.addClass('d-none');
            playAudio();
        });

        $('body').append(playButton);
    }
    else {
        playAudio();
    }

    sideBtn.click(function(e) {
        let opened = sidePanel.hasClass('open-panel');

        sidePanel.removeClass(opened ? 'open-panel' : 'close-panel');
        sidePanel.addClass(opened ? 'close-panel' : 'open-panel');
    });

    volumeControl.on('input', function(e) {
        audio.prop('volume', e.target.value * 0.01);
    });

    rightArrow.click(function(e) {
        let newFunc = animationFuncs[++currentIdx];

        if (!newFunc) {
            currentIdx = 0;
            newFunc = animationFuncs[currentIdx]; 
        }

        currentFunc.text(newFunc);
    });

    leftArrow.click(function(e) {
        let newFunc = animationFuncs[--currentIdx];

        if (!newFunc) {
            currentIdx = animationFuncs.length - 1;
            newFunc = animationFuncs[currentIdx]; 
        }

        currentFunc.text(newFunc);
    });

    audio.on('ended', function(e) {
        animations[currentFunc.text()]([]);
    })
    
    function playAudio() {
        try {
            let source = audioContext.createMediaElementSource(audio.get(0)),
                analyser = audioContext.createAnalyser(),
                frequencyData;
    
            source.connect(audioContext.destination);
            source.connect(analyser);
            audio.prop('volume', .5);
            frequencyData = new Uint8Array(analyser.frequencyBinCount);
            
            audio.trigger('play');
            renderFrame();
    
            function renderFrame() {
                if (!audio.prop('paused')) {
                    requestAnimationFrame(renderFrame);
                }

                analyser.getByteFrequencyData(frequencyData);
                animations[currentFunc.text()](frequencyData);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
});