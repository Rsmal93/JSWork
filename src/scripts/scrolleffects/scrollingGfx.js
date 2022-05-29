//Import this file last
var scrollCanvas = document.createElement('canvas');
scrollCanvas.id = 'scrollCanvas';
scrollCanvas.width = 530;
scrollCanvas.height = 260;
document.getElementById('scrollDiv').appendChild(scrollCanvas); //Add canvas to Div 'stage'
//Get the context of canvas
var scrollCtx = scrollCanvas.getContext('2d');

var scroll=new scrollGFX(scrollCanvas.width/2,scrollCanvas.width*.9);
var scrollObj = new scrollObject(scroll.getLaneCenter(2),100,30,50,0)



var translations= [-scrollObj.y,scrollObj.y];
var translation=translations[Math.floor(Math.random()*translations.length)];


const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;


var lspeed=randomIntFromInterval(10,15);//Random Range Function (random()*(max-min+1)+min)
var _rows=200;
var _cols=5;

var on = 0;
var _spins=0;

function scrollSetup(rows,cols,spins) {
    var doc = document.getElementById('scrollCanvas');
    doc.remove();
    var newscrollCanvas = document.createElement('canvas');
    newscrollCanvas.id = 'scrollCanvas';
    newscrollCanvas.width = 530;
    newscrollCanvas.height = 260;
    document.getElementById('scrollDiv').appendChild(newscrollCanvas); //Add canvas to Div 'stage'
    //Get the context of canvas
    scrollCtx = newscrollCanvas.getContext('2d');
    scroll=new scrollGFX(newscrollCanvas.width/2,newscrollCanvas.width*.9);
    scrollObj = new scrollObject(scroll.getLaneCenter(2),100,30,50,0)
    _rows=rows;_cols=cols;_spins=spins;on=1;
    looper();
    animate(lastTimestamp,true);
}


function looper() {
    clearInterval(interval);
    clearInterval(interval2);
    scrollObj.y=0;
    scrollObj.controls.forward=true;
    scrollCtx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scrollCtx.clearRect(0, 0, scrollCanvas.width, scrollCanvas.height*0.7);
    scrollCtx.translate(0,0);
    scrollCtx.restore();
    gridSquares=[];
    makeGameData(_rows+2,_cols+2);
    interval = setInterval(function () {
        //lspeed should be called every spin not frame
        gridSquares=[];
        makeGameData(_rows+2,_cols+2);
        //Put Real Icon in Position
        }, 1000);

    interval2 = setInterval(function () {
        //lspeed should be called every spin not frame
        lspeed=0;
        scrollObj.controls.forward=false;
        //scrollCtx.clearRect(0,0, scrollCanvas.width, scrollCanvas.height);
        //scrollCtx.translate(0,0);
        //gridSquares=[];
        //makeGameData(_rows+2,_cols+2);
        on=2;
        
            //Put Real Icon in Position
        }, 3000);
}
     

function animate(time) {
    if (on==1) {
        requestAnimationFrame(animate);
        //deltaTime = (time - lastTimestamp) / perfectFrameTime;
        //lastTimestamp = time;
        scrollCanvas=document.getElementById('scrollCanvas');
        scrollCtx=scrollCanvas.getContext('2d');
        scrollCanvas.height=260;
        scrollObj.update(true);
        scrollCtx.save();
        scrollCtx.translate(0,scrollObj.y+scrollCanvas.height*1.1); //ar down the screen 0.7 = 70%
        
        //scroll.draw(scrollCtx); //draw the road effect
        //scrollObj.draw(scrollCtx,"blue");
        scrollObj.maxSpeed=lspeed;
        for (j=0; j<_cols; j++) {
            for (i=0; i<_rows; i++) {
                var icon = 0; var cValue=0;
                for (e=0; e<gridSquares.length; e++) {
                    if (gridSquares[e].gridX == j && gridSquares[e].gridY == i) {icon = gridSquares[e].icon; cValue = gridSquares[e].coinValue;break;}}
                    scrollCtx.drawImage(orcIcons[icon],((scrollCanvas.width/_cols)*(j))+5,(i*82)-scrollObj.y/(time/50), 65, 65);
                }

        }
        scrollCtx.restore();
    }
    if (on==2) {
        on=0;
        clearInterval(interval);
        clearInterval(interval2);
        scrollObj.y=0;
        scrollCtx.save();
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        scrollCtx.clearRect(0, 0, scrollCanvas.width, scrollCanvas.height*0.7);
        scrollCtx.translate(0,0);
        scrollCtx.restore();
       
        loop(_spins);
        requestAnimationFrame(animate);
        
    }
}






