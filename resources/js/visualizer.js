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

        "Wave": function(data, canvas) {
            canvas.prop('width', window.innerWidth)
            canvas.prop('height', window.innerHeight)

            let height = canvas.prop('height'),
                width = canvas.prop('width'),
                centerX = width / 2,
                centerY = height /2,
                canvasContext = canvas.get(0).getContext('2d'),
                radius = 150,
                bars = 200,
                barWidth = 2,
                gradient = canvasContext.createLinearGradient(0, 0, 0, height);

            for (let i = bars - 30; i < bars; i++) {
                gradient.addColorStop(0, "rgba(" + data[i]  + ", " + "50" + ", 10, 1)");
                gradient.addColorStop(1, "rgba(" + data[i]  + ", " + "11" + ", 100, 1)");
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, width, height);
            }


            for (let i = 0; i < bars; i++) {
                let barHeight = data[i] * 0.7,
                    xStart = i * width/200,
                    yStart = centerY - barHeight,
                    xEnd = i * width/200,
                    yEnd = centerY + barHeight,
                    lineColor = 'rgb(' + data[i] + ', ' + data[i] + ', ' + 205 + ')';

                // Normal Pass
                canvasContext.strokeStyle = lineColor;
                canvasContext.lineWidth = barWidth;
                canvasContext.beginPath();
                canvasContext.moveTo(xStart, yStart);
                canvasContext.lineTo(xEnd, yEnd);
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
