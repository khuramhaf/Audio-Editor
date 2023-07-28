function myFunction() {

    document.getElementById("status").innerHTML = "Loading and decoding file..."
     
            clearInterval(intervalid);
    
        if (audiocontext === undefined){
     
     audiocontext= new AudioContext();
    }
    
    
    if (source){
     source.stop();
    }
    if (waveformsource){
            waveformsource.stop();
        }
    
    
     const fr = new FileReader();
    
     fr.onload = function(){
      
       audiocontext.decodeAudioData(fr.result, function(audiofile){
        var x = audiofile.getChannelData(0);
        var y = Array.from(x);
        try{
            if (array===null){
                array = y;
                sourceduration = 0;
                
            }
            else{
    
                if(array.length>0){
                    undo.push([...array])
                }
    
                array = array.concat(y);
            }
            
        }
        catch(error){
            alert('Limit Exceed');
            console.error("error");
            sourceduration=0;
        }
    
        document.getElementById("totallength").innerHTML=array.length;
        source = audiocontext.createBufferSource();
    check = 1;
    
        time = parseInt(sourceduration);
       
        
        document.getElementById("error").innerHTML = "";
    
    
    
       
    var array1 = new Float32Array(array);
        var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
        var ab1=  audiobuffer.getChannelData(0);
     ab1.set(array);
    
     
    
    
       
           
           source.buffer=audiobuffer;
           source.connect(audiocontext.destination);
           source.start(0, sourceduration);
           sourceduration = source.buffer.duration;
           
           document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
    
       if (source.buffer.duration>=1){
    intervalid =   setInterval(()=>{
            time++;
        document.getElementById("timer").innerHTML = time;
    
        if (time ===parseInt(source.buffer.duration)){
            clearInterval(intervalid);
        }
        
    }, 1000);
    }
    document.getElementById("status").innerHTML = "";
       }).catch(function(error){
        document.getElementById("status").innerHTML = "";
        document.getElementById("error").innerHTML = "Cannot open file"
       });;
    
      
     } 
     var Files= document.getElementById("file").files
     file = Files[0];
     if (file){
      fr.readAsArrayBuffer(Files[0]);
    }
    
    document.getElementById("file").value = '';
    }
    
  