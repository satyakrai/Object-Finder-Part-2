let status = false;
let objects = [];
let objectName = '';

function setup() {
    const canvasContainer = document.getElementById('canvas-container');
    const canvas = createCanvas(600, 500);
    canvas.parent(canvasContainer);
    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();
    console.log('ml5 version:', ml5.version); // Log ml5 version

  
    document.getElementById('input').addEventListener('input', function(event) {
        objectName = event.target.value.trim().toLowerCase(); 
    });
}

function Start() {
     
        objectDetector=ml5.objectDetector("cocossd",modelLoaded);
        document.getElementById("status").innerHTML = "Status: Detecting Objects.";
        objectName=documant.getElementById("input").value;
    
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    document.getElementById("status_objects").innerHTML = "Model Loaded!";
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (status!=" ") {
        objectDetector.detect(video, gotResult);
        for (let i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected!";
            document.getElementById("number_of_objects_detected").innerHTML = "Number of Objects Detected: " + objects.length;
            fill("#FF0000");
            let percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 20);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

   
            if (objects[i].label == objectName) {
                document.getElementById("status_objects").innerHTML = objectName + " detected!";
            }
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    objects = results;
}
