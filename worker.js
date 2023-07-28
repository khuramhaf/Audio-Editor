importScripts('https://cdn.jsdelivr.net/npm/lamejs@1.2.0/lame.min.js');



onmessage = function(event) {
    const myArray = event.data;

    

   
       var array = myArray.data;
        var mp3Data = [];

var samples = new Int16Array(array.length);

var j = 0;
  for (var i = 0; i < array.length; i++) {
    samples[j++] = (array[i] * 0x7FFF);
  }
var mp3encoder = new lamejs.Mp3Encoder(1, myArray.samplerate, 128);
 var mp3Tmp = mp3encoder.encodeBuffer(samples);
 mp3Data.push(mp3Tmp);


  postMessage(mp3Data);
};
  
  
  
  
  
       
  