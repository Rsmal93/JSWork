const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*.9);

let cars=[];
let bestCar=[];

let mutateAmount = JSON.parse(localStorage.getItem("mutate"));
let N = JSON.parse(localStorage.getItem("actors"));
if (N==null){N=250;}
if (mutateAmount==null){mutateAmount=0.1;}


//const car=new Car(road.getLaneCenter(1),100,30,50,"AI");//AI,KEYS,DUMMY
let traffic =[];
for (let i =0; i<40; i++) {
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*3)),-100-(Math.floor(Math.random()*(250-160)+160)*i),30,50,"DUMMY",2));
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random()*3)),-100-(Math.floor(Math.random()*(250-160)+160)*i),30,50,"DUMMY",2));
}


//animate();
carCanvas.height=window.innerHeight;
networkCanvas.height=window.innerHeight;
road.draw(carCtx);
document.getElementById("mutate").innerHTML="M: "+mutateAmount.toFixed(2);
document.getElementById("actors").innerHTML="N: "+N;

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
    if (N==51){
        N=50;
    }
    document.getElementById("actors").innerHTML="N: "+N;
}
function actorsDown() {
    N-=50;
    if (N<50) {
        N=1;
    }
    document.getElementById("actors").innerHTML="N: "+N;
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
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
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
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7); //ar down the screen 0.7 = 70%

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