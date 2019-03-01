$(document).ready(function() {
    const animations = {
        bar: function(data, canvas) {
            let centerX = canvas.prop('width') / 2,
                centerY = canvas.prop('height') /2,
                canvasContext = canvas.get(0).getContext('2d'),
                radius = 150,
                bars = 200,
                barWidth = 2,
                gradient = canvasContext.createLinearGradient(0, 0, 0, canvas.prop('height'));

            gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
            gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
            canvasContext.fillStyle = gradient;
            canvasContext.fillRect(0, 0, canvas.prop('width'), canvas.prop('height'));
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            canvasContext.stroke();

            for (let i = 0; i < bars; i++) {
                let radians = Math.PI * 2 / bars,
                    barHeight = data[i] * 0.7;
                    xStart = centerX + Math.cos(radians * i) * radius,
                    yStart = centerY + Math.sin(radians * i) * radius,
                    xEnd = centerX + Math.cos(radians * i) * (radius + barHeight),
                    yEnd = centerY + Math.sin(radians * i) * (radius + barHeight),
                    lineColor = 'rgb(' + data[i] + ', ' + data[i] + ', ' + 205 + ')';

                canvasContext.strokeStyle = lineColor;
                canvasContext.lineWidth = barWidth;
                canvasContext.beginPath();
                canvasContext.moveTo(xStart, yStart);
                canvasContext.lineTo(xEnd, yEnd);
                canvasContext.stroke();
            }
        }
    };

    let audio = $('audio'),
        audioContext = new AudioContext(),
        source = audioContext.createMediaElementSource(audio.get(0)),
        analyser = audioContext.createAnalyser(),
        display = $('#display'),
        frequencyData;

    source.connect(audioContext.destination);
    source.connect(analyser);
    display.prop('width', window.innerWidth);
    display.prop('height', window.innerHeight);

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
});