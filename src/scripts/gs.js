//elvis frog uses 830x500 canvas
//made with pixi js

//Player Vars
var playerVars = {
    money: 500.00, lines: 27, autoSpin: 0, betPerLine: 0.10
};

//Images to Load into Project
var backgroundImage = new Image(); //Black BG
var backgroundImage2 = new Image(); //Orc Lady Slots BG
var crossIcon = new Image();
var scrollImgs= [];
for (var i=0; i<5; i++) {
    var newImg = new Image();
    scrollImgs.push(newImg);
}
var icon0 = new Image(), icon1= new Image(), icon2= new Image(), icon3= new Image(), icon4= new Image(),
    icon5= new Image(), icon6 = new Image() , icon7 = new Image() , icon8 = new Image(),
    icon9 = new Image(), icon10 = new Image(), icon11 = new Image(), icon12 = new Image(),
    icon13 = new Image(), icon14 = new Image(); //Icons

var birdIcons = [icon10,icon11,icon12];
var orcIcons = [icon0,icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon10];

//Assign a source to the images
scrollImgs[0].src='src/images/iconsgrid1.jpg';
scrollImgs[1].src='src/images/iconsgrid2.jpg';
scrollImgs[2].src='src/images/iconsgrid3.jpg';
scrollImgs[3].src='src/images/iconsgrid4.jpg';
scrollImgs[4].src='src/images/iconsgrid5.jpg';
backgroundImage.src = 'src/images/back.png'; 
backgroundImage2.src = 'src/images/gifs/gr3.gif'; 
crossIcon.src = 'src/images/icons/cross.png';
icon0.src = 'src/images/icons/ball0.png', icon1.src = 'src/images/icons/ball1.png', icon2.src = 'src/images/icons/ball2.png', 
icon3.src = 'src/images/icons/ball3.png', icon4.src = 'src/images/icons/ball4.png', icon5.src = 'src/images/icons/ball5.png', 
icon6.src = 'src/images/icons/ball6.png', icon7.src = 'src/images/icons/ball7.png', icon8.src = 'src/images/icons/ball8.png'
icon9.src = 'src/images/icons/ball9.png', icon10.src = 'src/images/icons/ball10.png',icon11.src = 'src/images/icons/icon0.png', icon12.src = 'src/images/icons/icon1.png', 
icon13.src = 'src/images/icons/icon2.png';

//Generally, an image object would have an event listener
//attached to listen to 'load' and 'error' events which
//are not included here for brevity.
    
//Create a canvas
var canvas = document.createElement('canvas');
canvas.id = 'gameCanvas';
canvas.width = 720;
canvas.height = 480;
document.getElementById('stage').appendChild(canvas); //Add canvas to Div 'stage'
//Get the context of canvas
var ctx = canvas.getContext('2d');

//Elements used
var bgImg = document.createElement('div');bgImg.className='background-gif';bgImg.id='bg';bgImg.style.backgroundSize='720px 410px'; 
bgImg.style.backgroundImage = "url('src/images/gifs/gr1.gif')";document.getElementById('stage').appendChild(bgImg);
var botBar = document.createElement('div');botBar.className='bottomBar'; 
botBar.style.backgroundImage = "url('src/images/gifs/back.gif')";document.getElementById('stage').appendChild(botBar);

var borderImg = document.createElement('div');borderImg.className='border';borderImg.id='border';
borderImg.style.backgroundImage = "url('src/images/border.png') ";document.getElementById('stage').appendChild(borderImg);

//Lines GUI
var linesLabel1 = document.getElementById('linesLabel1');centreElement('stage', linesLabel1, 10,415);
var linesLabel2 = document.getElementById('linesLabel2');centreElement('stage', linesLabel2, 30,442);
var upLinesButton = document.getElementById('upLinesButton');centreElement('stage', upLinesButton, 65,440);
var downLinesButton = document.getElementById('downLinesButton');centreElement('stage', downLinesButton, 65,460);

//Bet GUI
var betLabel1 = document.getElementById('betLabel1');centreElement('stage', betLabel1, 100,415);
var betLabel2 = document.getElementById('betLabel2');centreElement('stage', betLabel2, 113,442);
var upBetButton = document.getElementById('upBetButton');centreElement('stage', upBetButton, 160,440);
var downBetButton = document.getElementById('downBetButton');centreElement('stage', downBetButton, 160,460);

var betLabel3 = document.getElementById('betLabel3');centreElement('stage', betLabel3, 195,415);
var betLabel4 = document.getElementById('betLabel4');centreElement('stage', betLabel4, 200,442);

var payoutLabel1 = document.getElementById('payoutLabel1');centreElement('stage', payoutLabel1, 400,410);
var payoutLabel2 = document.getElementById('payoutLabel2');centreElement('stage', payoutLabel2, 395,430);
var payoutLabel3 = document.getElementById('payoutLabel3');centreElement('stage', payoutLabel3, 280,410);
var payoutLabel4 = document.getElementById('payoutLabel4');centreElement('stage', payoutLabel4, 280,430);

var moneyLabel1 = document.getElementById('moneyLabel1');centreElement('stage', moneyLabel1, 500,435);
var moneyLabel2 = document.getElementById('moneyLabel2');centreElement('stage', moneyLabel2, 508,452);
var titleLabel1 = document.getElementById('titleLabel1');centreElement('stage', titleLabel1, 277,28);
var titleLabel2 = document.getElementById('titleLabel2');centreElement('stage', titleLabel2, 176,34);
var titleLabel3 = document.getElementById('titleLabel3');centreElement('stage', titleLabel3, 210,34);
var titleLabel4 = document.getElementById('titleLabel4');centreElement('stage', titleLabel4, 160,49);
var titleLabel5 = document.getElementById('titleLabel5');centreElement('stage', titleLabel5, 210,49);
var titleLabel6 = document.getElementById('titleLabel6');centreElement('stage', titleLabel6, 522,41);
var titleLabel7 = document.getElementById('titleLabel7');centreElement('stage', titleLabel7, 448,40);
var titleLabel8 = document.getElementById('titleLabel8');centreElement('stage', titleLabel8, 593,377);
var settingsButton = document.getElementById('settingsButton');centreElement('stage', settingsButton, 535,412);
var featuresButton = document.getElementById('featuresButton');centreElement('stage', featuresButton, 562,412);
var gambleButton = document.getElementById('gambleButton');centreElement('stage', gambleButton, 481,412);
var collectButton = document.getElementById('collectButton');centreElement('stage', collectButton, 508,412);
gambleButton.style.display='none';collectButton.style.display='none';

var autoSpinButton = document.getElementById('autoSpinButton');centreElement('stage', autoSpinButton, 590,415);
var autoSpinButton2 = document.getElementById('autoSpinButton2');centreElement('stage', autoSpinButton2, 590,379);
var autoSpinButton3 = document.getElementById('autoSpinButton3');centreElement('stage', autoSpinButton3, 622,379);
var autoSpinButton4 = document.getElementById('autoSpinButton4');centreElement('stage', autoSpinButton4, 654,379);
var autoSpinButton5 = document.getElementById('autoSpinButton5');centreElement('stage', autoSpinButton5, 686,379);
var autoSpinButton6 = document.getElementById('autoSpinButton6');centreElement('stage', autoSpinButton6, 590,379);
var spinButton = document.getElementById('spinButton');centreElement('stage', spinButton, 655,415);
var linesRange = document.getElementById('linesRange');centreElement('stage', linesRange, 200,600);
var scrollDiv=document.getElementById('scrollDiv');centreElement('stage', scrollDiv, 108,78);



spinButton.onclick = function() {Delay.timeStop.bind(Delay)};
spinButton.onclick = function() {spinLength('1');}
spinButton.style.height='60px';spinButton.style.width='60px';
autoSpinButton.style.height='60px';autoSpinButton.style.width='60px';autoSpinButton.innerHTML= '⟳';autoSpinButton.style.fontSize='30px';
autoSpinButton2.style.height = '30px';autoSpinButton2.style.width = '30px';autoSpinButton2.style.zIndex = 5;autoSpinButton2.style.display='none';
autoSpinButton3.style.height = '30px';autoSpinButton3.style.width = '30px';autoSpinButton3.style.zIndex = 5;autoSpinButton3.style.display='none';
autoSpinButton4.style.height = '30px';autoSpinButton4.style.width = '30px';autoSpinButton4.style.zIndex = 5;autoSpinButton4.style.display='none';
autoSpinButton5.style.height = '30px';autoSpinButton5.style.width = '30px';autoSpinButton5.style.zIndex = 5;autoSpinButton5.style.display='none';
autoSpinButton6.style.height = '30px';autoSpinButton6.style.width = '30px';autoSpinButton6.style.zIndex = 5;autoSpinButton6.style.display='none';

linesLabel1.style.height='20px';linesLabel1.style.width='100px'; linesLabel1.style.fontSize='medium'; linesLabel2.innerHTML=playerVars.lines;
linesLabel2.style.height='20px';linesLabel2.style.width='60px'; linesLabel2.style.fontSize='x-large'; 
upLinesButton.style.height='18px';upLinesButton.style.width='18px';upLinesButton.style.fontSize='12px';downLinesButton.style.height='18px';downLinesButton.style.width='18px';downLinesButton.style.fontSize='12px'; 

betLabel1.style.height='20px';betLabel1.style.width='100px'; betLabel1.style.fontSize='medium'; betLabel2.innerHTML=parseFloat(playerVars.betPerLine).toFixed(2);
betLabel2.style.height='20px';betLabel2.style.width='60px'; betLabel2.style.fontSize='x-large'; 
upBetButton.style.height='18px';upBetButton.style.width='18px';upBetButton.style.fontSize='12px';downBetButton.style.height='18px';downBetButton.style.width='18px';downBetButton.style.fontSize='12px';

betLabel3.style.height='20px';betLabel3.style.width='60px'; betLabel3.style.fontSize='medium'; betLabel4.innerHTML=parseFloat(playerVars.betPerLine*playerVars.lines).toFixed(2);
betLabel4.style.height='20px';betLabel4.style.width='60px'; betLabel4.style.fontSize='x-large'; 

payoutLabel1.style.height='20px';payoutLabel1.style.width='60px'; payoutLabel1.style.fontSize='medium';
payoutLabel2.style.height='40px';payoutLabel2.style.width='150px'; payoutLabel2.style.fontSize='xx-large';payoutLabel4.style.fontSize='xx-large';payoutLabel3.style.fontSize='medium';

moneyLabel1.style.height='20px';moneyLabel1.style.width='80px'; moneyLabel1.style.fontSize='medium'; moneyLabel2.innerHTML=parseFloat(playerVars.money).toFixed(2);
moneyLabel2.style.height='20px';moneyLabel2.style.width='150px'; moneyLabel2.style.fontSize='x-large';  titleLabel8.style.fontSize='28px';titleLabel8.style.display='none';

featuresButton.style.height = '25px';featuresButton.style.width = '25px'; gambleButton.style.fontSize='auto';
settingsButton.style.height = '25px';settingsButton.style.width = '25px'; settingsButton.style.fontSize='auto';
gambleButton.style.height = '25px';gambleButton.style.width = '25px'; gambleButton.style.fontSize='auto';
collectButton.style.height = '25px';collectButton.style.width = '25px'; collectButton.style.fontSize='auto';


//Assign window.requestAnimationFrame
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           function(callback) {
               return window.setTimeout(callback, 16.6667);
           }            
}());


//Globals Vars
var rows=3;
var cols=5;
var gridSquares = [];
var lines = [];
var isAnimating=0; //0 null, 1 on, 2 off
var play=false;
var paidInfo = [];
var paidLine;
var lineTime=1;
var totalWin;

//Our loop function, which will be called on requesting animation frame
var interval; var interval2; var clicked = false; var spinsLeft=1; var freeSpins=0; var trackedSpinsLeft=0; var hasLooped = false;

async function loop(spins) {
    //window.requestAnimationFrame(loop);
    //autoSpinButton.innerHTML=spinsLeft;
    spinsLeft=spins;
    if (freeSpins == 0) {if (spinsLeft > 1000) {autoSpinButton.innerHTML='∞';}}
    autoSpinButton2.style.display = 'none';autoSpinButton3.style.display = 'none';autoSpinButton4.style.display = 'none';autoSpinButton5.style.display = 'none';
    if (freeSpins > 0) {
        autoSpinButton.innerHTML=freeSpins;
    }
    if (spins==0 && trackedSpinsLeft > 0) {
        spinsLeft=trackedSpinsLeft;
    } else {spinsLeft=spins;}
    if (spinsLeft > 0) {
        if (clicked==false) {
            if (spinsLeft > 1 && freeSpins==0) {
            autoSpinButton6.style.display = 'block';
            }
            if (spinsLeft > 1) {
                upBetButton.disabled=true;upLinesButton.disabled=true;
                downBetButton.disabled=true;downLinesButton.disabled=true;
            }
            clicked=true;
            if (isAnimating==1) {
                isAnimating=2;
            }
            if (interval!=null) {
                clearInterval(interval);
            }
            while (isAnimating!=0) {
                    await delay(0.1);
                }
            //wait until current animations have stopped
            if (isAnimating==0) {
                if (playerVars.money >= (playerVars.betPerLine*playerVars.lines)) {
                    if (freeSpins == 0) {
                    playerVars.money-=(playerVars.betPerLine*playerVars.lines);
                    moneyLabel2.innerHTML=parseFloat(playerVars.money).toFixed(2);
                    trackedSpinsLeft-=1;
                    } else { freeSpins-=1;}
                    payoutLabel2.innerHTML='';payoutLabel1.innerHTML='';payoutLabel3.innerHTML='';payoutLabel4.innerHTML=''; 
                    gambleButton.style.display='none';collectButton.style.display='none';
                    spinsLeft-=1;if (spinsLeft > 1000) {autoSpinButton.innerHTML='∞';} else if (spinsLeft > 0) {autoSpinButton.innerHTML=spinsLeft;}         
                    linesBaby(rows,cols);
                    backdropSetup();
                    clicked=false;
                    scrollSetup(rows,cols,trackedSpinsLeft);
                    //gameScreen(rows,cols);
                }
            
            }
        }  
    } else {
        stopAutoSpin();
    }
}





//Clear current canvas and replace background
function backdropSetup() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(backgroundImage, 0, 0); //ctx.drawImage(backgroundImage2, 0, 0);
    //Delete button elements from External Pages
    const boxes = document.querySelectorAll('.space');
    boxes.forEach(box => {box.remove();});
    //Features
    var f1 = document.getElementById('blazing-reels');
    if (f1!=null){f1.remove();}
}



//Draw info page ontop of grid
function infoPage() {
   backdropSetup();//Clear the canvas
   //createHTMLElement('button','blazing-reels','glow-on-hover','Blazing Reels','stage',2,-575,0,0);
   //var infoBotCTX = document.getElementById('info-bottom').getContext('2d');
   //infoBotCTX.drawImage(backgroundImage, 0, 0); 
   //Button for each Feature
}


//Lines Range input on HTML
linesRange.oninput = function() {
    showLines(this.value);
  }
  
function showLines(f) {
    backdropSetup();
    //orcs gamegrid
    for (a=0; a<lines.length; a++) {
        var rows = 3,cols = 5;
        for (i=0; i<rows; i++) {for (j=0; j<cols; j++) {
            if (lines[f][a] !=null){if (lines[f][a][0] == i && lines[f][a][1] == j) {
                ctx.drawImage(orcIcons[8], (crossIcon.width)*(j), (crossIcon.height)*(i));
                if (i==0) {
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i+1));
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i+2));} 
                else if (i==1) {
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i-1));
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i+1));} 
                else if (i==2) {
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i-1));
                    ctx.drawImage(crossIcon, (crossIcon.width)*(j), (crossIcon.height)*(i-2));} 
            }}     
        }}
    }
}


backdropSetup();

//Animated Entities
//Line Display
var box = {
    x: 0,
    y: 0,
    w: backgroundImage2.width /25,
    h: backgroundImage2.height /25,
    col: '#ff0000',
    dir: {x: 1, y: 1},
    s: 5
};
function updateBox() {
    box.x += box.dir.x * box.s;
    box.y += box.dir.y * box.s;
    
    if(box.x < 0) {
        box.x = 0;
        box.dir.x *= -1;
    }
    
    if(box.x + box.w > canvas.width) {
        box.x = canvas.width - box.w;
        box.dir.x *= -1;
    }
    
    if(box.y + box.h > canvas.height) {
        box.y = canvas.height - box.h;
        box.dir.y *= -1;
    }
    
    if(box.y < 0) {
        box.y = 0;
        box.dir.y *= -1;
    }
}


    


