function undodata(){
    
    
    document.getElementById("error").innerHTML = "";
if (undo.length >0){

    if (source){
source.stop()
}

clearInterval(intervalid);
time = 0;

array = undo[undo.length-1];
undo.pop();


document.getElementById("totallength").innerHTML=array.length;
source = audiocontext.createBufferSource();
var array1 = new Float32Array(array);
var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
var ab1=  audiobuffer.getChannelData(0);
ab1.set(array);

source.buffer=audiobuffer;
source.connect(audiocontext.destination);
source.start(0);
sourceduration = source.buffer.duration;
document.getElementById("duration").innerHTML = source.buffer.duration;
if ( source.buffer.duration >=1){
intervalid =   setInterval(()=>{
time++;
document.getElementById("timer").innerHTML = time;
if (time === parseInt(source.buffer.duration)){
clearInterval(intervalid);
}
}, 1000);
}

}}