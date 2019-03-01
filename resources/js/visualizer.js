$(document).ready(function() {
    let audio = $('audio'),
        audioContext = new AudioContext(),
        source = audioContext.createMediaElementSource(audio.get(0)),
        analyser = audioContext.createAnalyser(),
        dataDisplay = $('p#data'),
        frequencyData;

    source.connect(audioContext.destination);
    source.connect(analyser);

    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    
    audio.trigger('play');
    renderFrame();

    function renderFrame() {
        if (!audio.prop('paused')) {
            requestAnimationFrame(renderFrame);
        }
        analyser.getByteFrequencyData(frequencyData);

        dataDisplay.text(frequencyData ? frequencyData.join(',') : 'Loading');
    }
});