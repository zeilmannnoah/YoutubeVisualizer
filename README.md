# Youtube Visualizer
This is a simple Node JS app, leveraging the power of Express and Bootstrap to stream Youtube audio and visualize the audio in real time.
## Installation
1. FFMPEG is needed to stream Youtube's audio, this can be installed by downloading a static build of FFMPEG [here](https://ffmpeg.zeranoe.com/builds/). Then adding the absolute folder location of FFMPEG's bin folder to your PATH. 
2. You will need to set an environment variable with the key *GOOGLE_API_KEY*, and the value should be your Google API key which can be generated [here](https://console.developers.google.com/apis/api/youtube.googleapis.com/overview).
3. You will need to have Node JS installed and run *npm i* inside the project's root directory.
