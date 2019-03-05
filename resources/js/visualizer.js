$(document).ready(function() {
    const animations = {
        bar: function(data, canvas) {
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


            for (let i = 0; i < bars; i++) {
                let radians = Math.PI * 2 / (bars - 60),
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
        }
    };

    let sideBtn = $('#side-btn'),
        sidePanel = $('#side-panel'),
        volumeControl = $('#volume-control'),
        audio = $('audio');

    $('body').prop('scroll', "no");
    $('body').addClass('no-scroll');

    sideBtn.click(function(e) {
        let opened = sidePanel.hasClass('open-panel');
        sidePanel.removeClass(opened ? 'open-panel' : 'close-panel');
        sidePanel.addClass(opened ? 'close-panel' : 'open-panel');
    });

    volumeControl.on('input', function(e) {
        audio.prop('volume', e.target.value * 0.01);
    });

    try {
        let audioContext = new AudioContext(),
            source = audioContext.createMediaElementSource(audio.get(0)),
            analyser = audioContext.createAnalyser(),
            display = $('#display'),
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

            animations['bar'](frequencyData, display);
        }
    }
    catch (err) {
        console.log(err);
    }
});