status1=" "
statfound=" "
objects=[];

function setup(){
    canvas=createCanvas(550,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(550,500);
    video.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects 👀";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("model is being loaded 🤑");
    status1=true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,550,500);
    if(status1 !=" "){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects detected: "+objects.length;
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML=object_name+" found";
                synth=window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterthis);
            }else{
                document.getElementById("object_status").innerHTML=object_name+"not found";
            }
        }
    }
}
