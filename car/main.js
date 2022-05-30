const scrollCanvas=document.getElementById("carCanvas");
scrollCanvas.width=200;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = scrollCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(scrollCanvas.width/2,scrollCanvas.width*.9);

let cars=[];
let bestCar=[];

let mutateAmount = JSON.parse(localStorage.getItem("mutate"));
let N = JSON.parse(localStorage.getItem("actors"));
let raySpread = JSON.parse(localStorage.getItem("raySpread"));
let rSpreadVal = JSON.parse(localStorage.getItem("spreadVal"));
let rayLength = JSON.parse(localStorage.getItem("rayLength"));
let rayCount = JSON.parse(localStorage.getItem("rayCount"));
let carSpeed = JSON.parse(localStorage.getItem("speed"));
let hidden = JSON.parse(localStorage.getItem("hidden"));

if (raySpread==null) {raySpread=Math.PI/1.5}
if (rSpreadVal==null) {rSpreadVal=1.5}
if (rayLength==null) {rayLength=100}
if (rayCount==null) {rayCount=6}
if (carSpeed==null) {carSpeed=4}
if (hidden==null) {hidden=6}
if (N==null){N=250;}
if (mutateAmount==null){mutateAmount=0.1;}


//const car=new Car(road.getLaneCenter(1),100,30,50,"AI");//AI,KEYS,DUMMY
let traffic =[];
for (let i =0; i<40; i++) {
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*3)),-100-(Math.floor(Math.random()*(330-160)+160)*i),25,40,"DUMMY",2));
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*3)),-100-(Math.floor(Math.random()*(330-160)+160)*i),30,50,"DUMMY",2));
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*3)),-100-(Math.floor(Math.random()*(330-160)+160)*i),30,50,"DUMMY",2));
}


//animate();
scrollCanvas.height=window.innerHeight;
networkCanvas.height=window.innerHeight;
road.draw(carCtx);
document.getElementById("mutate").innerHTML="M: "+mutateAmount.toFixed(2);
document.getElementById("actors").innerHTML="N: "+N;
document.getElementById("raySpread").innerHTML="RS: "+raySpread.toFixed(2);
document.getElementById("rayLength").innerHTML="RL: "+rayLength;
document.getElementById("rayCount").innerHTML="RC: "+rayCount;
document.getElementById("speed").innerHTML="S: "+carSpeed;
document.getElementById("hidden").innerHTML="?: "+hidden;

function mutateUp() {
    mutateAmount+=0.01;
    document.getElementById("mutate").innerHTML="M: "+mutateAmount.toFixed(2);
}
function mutateDown() {
    mutateAmount-=0.01;
    document.getElementById("mutate").innerHTML="M: "+mutateAmount.toFixed(2);
}
function actorsUp() {
    N+=50;
    if (N==51){N=50;}
    document.getElementById("actors").innerHTML="N: "+N;
}
function actorsDown() {
    N-=50;
    if (N<50) {N=1;}
    document.getElementById("actors").innerHTML="N: "+N;
}
function hiddenUp() {
    hidden+=1;
    document.getElementById("hidden").innerHTML="?: "+hidden;
}
function hiddenDown() {
    hidden-=1;
    document.getElementById("hidden").innerHTML="?: "+hidden;
}


function raySpreadUp() {
    rSpreadVal+=0.1;
    raySpread=Math.PI/rSpreadVal;
    document.getElementById("raySpread").innerHTML="RS: "+raySpread.toFixed(2);
}
function raySpreadDown() {
    rSpreadVal-=0.1;
    raySpread=Math.PI/rSpreadVal;
    document.getElementById("raySpread").innerHTML="RS: "+raySpread.toFixed(2);
}
function rayLengthUp() {
    rayLength+=10;
    document.getElementById("rayLength").innerHTML="RL: "+rayLength;
}
function rayLengthDown() {
    rayLength-=10;
    document.getElementById("rayLength").innerHTML="RL: "+rayLength;
}
function rayCountUp() {
    rayCount+=1;
    document.getElementById("rayCount").innerHTML="RC: "+rayCount;
}
function rayCountDown() {
    rayCount-=1;
    document.getElementById("rayCount").innerHTML="RC: "+rayCount;
}
function speedUp() {
    carSpeed+=1;
    document.getElementById("speed").innerHTML="S: "+carSpeed;
}
function speedDown() {
    carSpeed-=1;
    document.getElementById("speed").innerHTML="S: "+carSpeed;
}
function go() {
    cars = generateCars(N);
    bestCar=cars[0];
    if(localStorage.getItem("bestBrain")){
        for (let i=0; i<cars.length; i++) {
            cars[i].brain=JSON.parse(
                localStorage.getItem("bestBrain"));
            if (i!=0){
                NeuralNetwork.mutate(cars[i].brain,mutateAmount);
            }
        }
    }
    animate();
    document.getElementById('goButton').style.display='none';
    document.getElementById('reloadButton').style.display='block';
}

document.getElementById('reloadButton').style.display='none';

function reload() {
    localStorage.setItem("mutate",
    JSON.stringify(mutateAmount));
    localStorage.setItem("actors",
    JSON.stringify(N));
    localStorage.setItem("rayCount",
    JSON.stringify(rayCount));
    localStorage.setItem("rayLength",
    JSON.stringify(rayLength));
    localStorage.setItem("raySpread",
    JSON.stringify(raySpread));
    localStorage.setItem("spreadVal",
    JSON.stringify(rSpreadVal));
    localStorage.setItem("speed",
    JSON.stringify(carSpeed));
    localStorage.setItem("hidden",
    JSON.stringify(hidden));
    window.location.reload();
}


function save() {
    localStorage.setItem("bestBrain",
    JSON.stringify(bestCar.brain));
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    let cars=[];
    for(let i=1; i<=N;i++) {
        cars.push(new Car(road.getLaneCenter(1),100,15,15,"AI"));
    }
    return cars;
}

function animate(time) {
    for (let i=0; i<traffic.length;i++) {
        traffic[i].update(road.borders,[]);
    }
    for (let i=0; i<cars.length; i++) {
        cars[i].update(road.borders,traffic);
    }

    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        )
    );
    scrollCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+scrollCanvas.height*0.7); //ar down the screen 0.7 = 70%

    road.draw(carCtx);
    for (let i=0; i<traffic.length; i++) {
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for (let i=0; i<cars.length; i++) {
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();
    networkCtx.lineDashOffset=-time/50;

    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}
