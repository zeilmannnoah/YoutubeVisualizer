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
        "Double Wave": function(data){
            canvas.prop('width', window.innerWidth)
            canvas.prop('height', window.innerHeight)

            let startX = 1,
                startY = canvas.prop('height'),
                height = canvas.prop('height'),
                gradient = canvasContext.createLinearGradient(0,0,0,height), nb
                bars = 100,
                greatest = 0;
                canvasContext = canvas.get(0).getContext('2d'),
                division = canvas.prop('width')/100;
            
                gradient.addColorStop(0, "rgba(107, 39, 139, 1)");
                gradient.addColorStop(1, "rgba(50, 155, 190, 1)");
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, canvas.prop('width'), canvas.prop('height'));
                canvasContext.beginPath();
                canvasContext.stroke();
            
            
            for (let i = 0; i < bars; i++) {
                    let xStart = startX + (division*i),
                    yStart = startY,
                    xEnd = xStart,
                    yEnd = yStart - data[i]*1.5,
                    lineLength = yEnd-yStart,
                    barWidth = 3,
                    lineColor = 'rgb(' + data[i] + ', ' + data[i]+80 + ', ' + 150 + ')';
                    if(lineLength<greatest){
                        greatest = lineLength;
                    }
                    
                    canvasContext.strokeStyle = lineColor;
                    canvasContext.lineWidth = barWidth;
                    canvasContext.beginPath();
                    canvasContext.moveTo(xStart, yStart+lineLength/2);
                    canvasContext.lineTo(xEnd, yEnd+lineLength/2);
                    canvasContext.stroke();
            }
            for (let i = 100; i < bars+100; i++) {
                    
                    let xStart = startX + (division*(i-100)),
                    yStart = startY+(greatest),
                    xEnd = xStart,
                    yEnd = yStart - data[i]*1.5,
                    lineLength = yEnd-yStart,
                    barWidth = 3,
                    lineColor = 'rgb(' + data[i] + ', ' + data[i]+120 + ', ' + 200 + ')';
                    
                    
                    canvasContext.strokeStyle = lineColor;
                    canvasContext.lineWidth = barWidth;
                    canvasContext.beginPath();
                    canvasContext.moveTo(xStart, yStart+lineLength-30);
                    canvasContext.lineTo(xEnd, yEnd+lineLength-30);
                    canvasContext.stroke();
            }
        },
        "Polygon": function(data){
            canvas.prop('width', window.innerWidth)
            canvas.prop('height', window.innerHeight)

            let startX = 1,
                startY = canvas.prop('height'),
                height = canvas.prop('height'),
                bars = 200,
                canvasContext = canvas.get(0).getContext('2d'),
                division = canvas.prop('width')/bars,
                barWidth=2,
                gradient = canvasContext.createLinearGradient(0,0,0,height);

            let xStart = startX;
            let yStart = startY/2;
            let topXStart = 0;
            let topYStart = 0;
            let bottomXStart = 0;
            let bottomYStart = 0;
            let topXEnd = 0;
            let topYEnd = 0;
            let bottomXEnd = 0;
            let bottomYEnd = 0;
            let drawTop = false;
            let drawBottom = false;


            gradient.addColorStop(0, "rgba(107, 39, 139, 1)");
                gradient.addColorStop(1, "rgba(50, 155, 190, 1)");
                canvasContext.fillStyle = gradient;
                canvasContext.fillRect(0, 0, canvas.prop('width'), canvas.prop('height'));
                canvasContext.beginPath();
                canvasContext.stroke();

            for(let i=0;i<bars+5;i++){
                    if(i%2==0 && i%4!=0 && i!=0){
                        let xEnd = startX + (division*i),
                        yEnd = yStart - (data[i] + 20),
                        lineColor = 'rgb(' + data[i] + ', ' + data[i]+50 + ', ' + 205 + ')';
                        if(yEnd < 0) yEnd=0;
                        if(yEnd > height) yEnd=height;
                        if(xEnd>canvas.prop('width')){
                            xEnd = canvas.prop('width');
                        }
                        if(drawTop==false){
                            bottomXStart = xStart;
                            bottomYStart = yStart;
                        }
                        if(drawTop==true){
                            topXEnd = xEnd;
                            topYEnd = yEnd;
                            canvasContext.strokeStyle = lineColor;
                            canvasContext.lineWidth = barWidth;
                            canvasContext.beginPath();
                            canvasContext.moveTo(topXStart, topYStart);
                            canvasContext.lineTo(topXEnd, topYEnd);
                            canvasContext.stroke();
                        }
                        
                        if(drawBottom==false){
                            topXStart = xEnd;
                            topYStart = yEnd;
                        }
                        
                        canvasContext.strokeStyle = lineColor;
                        canvasContext.lineWidth = barWidth;
                        canvasContext.beginPath();
                        canvasContext.moveTo(xStart, yStart);
                        canvasContext.lineTo(xEnd, yEnd);
                        canvasContext.stroke();
                        //yStart = yEnd;
                        xStart = xEnd;
                        
                        topXStart = xEnd;
                        topYStart = yEnd;
                        
                        
                        drawTop = true;
                       }else if(i%4==0 && i!=0){
                        let //radians = Math.PI * 2 / bars,
                        barHeight = data[i] * 0.7,
                        xEnd = startX + (division*i),
                        yEnd = yStart + (data[i] + 20),
                        lineColor = 'rgb(' + data[i]+100 + ', ' + data[i] + ', ' + 205 + ')';
                
                        if(yEnd < 0) yEnd=0;
                        if(yEnd > height) yEnd=height;
                            bottomXEnd = xEnd;
                            bottomYEnd = yEnd;
                            canvasContext.strokeStyle = lineColor;
                            canvasContext.lineWidth = barWidth;
                            canvasContext.beginPath();
                            canvasContext.moveTo(bottomXStart, bottomYStart);
                            canvasContext.lineTo(bottomXEnd, bottomYEnd);
                            canvasContext.stroke();
                        
                        
                        canvasContext.strokeStyle = lineColor;
                        canvasContext.lineWidth = barWidth;
                        canvasContext.beginPath();
                        canvasContext.moveTo(xStart, yStart);
                        canvasContext.lineTo(xEnd, yEnd);
                        canvasContext.stroke();
                        //yStart = yEnd;
                        xStart = xEnd;
                
                        bottomXStart = xEnd;
                        bottomYStart = yEnd;
                
                        drawBottom = true;
                       }
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