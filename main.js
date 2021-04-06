var synth = window.speechSynthesis;
var input_text ="";
objects =[];
var status ="";
var voice ="";

function setup() {
    canvas = createCanvas(480, 400);
    canvas.position(430, 140);
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'STATUS : DETECTING OBJECTS';  
    input_text = document.getElementById("inputXD").value;
    var utterThis = new SpeechSynthesisUtterance(input_text);
    synth.speak(utterThis);
}

function modelLoaded() {
    console.log("MODEL LOADED SUCCESSFULY");
    status = true;
}

function draw() {
    image(video, 0, 0, 480, 400);

    if(status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "STATUS : DETECTED OBJECTS";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
            if(objects[i].label == input_text) {
                document.getElementById("found_or!=").innerHTML = input_text + " found";
                voice = input_text + " found";
                var utterThis = new SpeechSynthesisUtterance(voice);
                synth.speak(utterThis);
            }
            else if(objects[i].label != input_text) {
                document.getElementById("found_or!=").innerHTML = input_text + " not found";
                voice = input_text + " not found";
                var utterThis = new SpeechSynthesisUtterance(voice);
                synth.speak(utterThis);
            }
        }
    }
}


function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}