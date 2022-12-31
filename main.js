song="";
leftWristX="";
leftWristY="";
rightWristX="";
rightWristY="";
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
    song1=loadSound("qwertyuiop.mp3");
    song2=loadSound("asdfghjkl.mp3");

}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('model loded !!')
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);
    fill('#FF0000');
    stroke('#FF0000');

    circle(rightWristX,rightWristY,20);
    
    if(scorerightWrist>0.2)
    {   
        if(rightWristY>20&&rightWristY<=100)
        {
            document.getElementById(speed).innerHTML="speed=0.5x"
            song1.rate(0.5);
            song2.rate(0.5);
        }
    
        if(rightWristY>100&&rightWristY<=200)
        {
            document.getElementById(speed).innerHTML="speed=1x"
            song1.rate(1);
            song2.rate(1);
        }
    
        if(rightWristY>200&&rightWristY<=300)
        {
            document.getElementById(speed).innerHTML="speed=1.5x"
            song1.rate(1.5);
            song2.rate(1.5);
        }
    
        if(rightWristY>300&&rightWristY<=400)
        {
            document.getElementById(speed).innerHTML="speed=2x"
            song1.rate(2);
            song2.rate(2);
        }
    
        if(rightWristY>400)
        {
            document.getElementById(speed).innerHTML="speed=2.5x"
            song1.rate(2.5);
            song2.rate(2.5);
        }
     

    }
    

    if(scoreleftWrist>0.2)
    {
        
        circle(leftWristX,leftWristY,20);
        noleftWristY=Number(leftWristY);
        decimaless=floor(noleftWristY);
        volume=decimaless/500;
        document.getElementById('volume').innerHTML='Volume-'+volume;
        song1.setVolume(volume);
        song2.setVolume(volume);
    }
}
function play() {
    song2.stop();
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function play2() {
    song1.stop();
    song2.play();
    song2.setVolume(0.5);
    song2.rate(1);
}

function stop(){
    song1.stop();
    song2.stop();
}
