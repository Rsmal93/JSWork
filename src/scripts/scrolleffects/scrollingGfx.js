//For each scroller
var scrollCanvases=[];
var scrollCTXs=[];
var scrollGFXs=[];
var scrollOBJs=[];
let scrollers = 5;
var totalWidth=530;

for (i=0; i<scrollers; i++) {
    var scrollCanvas = document.createElement('canvas');scrollCanvas.id = 'scrollCanvas'+i;
    scrollCanvas.width = 105;scrollCanvas.height = 260;scrollCanvas.style.left=60*i+'px';
    document.getElementById('scrollDiv').appendChild(scrollCanvas); //Add canvas to Div 'stage'
    //Get the context of canvas
    var scrollCtx = scrollCanvas.getContext('2d');
    var scroll=new scrollGFX(scrollCanvas.width/2,scrollCanvas.width*.9);
    var scrollObj = new scrollObject(scroll.getLaneCenter(2),100,30,50,0)

    scrollCanvases.push(scrollCanvas);
    scrollCTXs.push(scrollCtx);
    scrollGFXs.push(scroll);
    scrollOBJs.push(scrollObj);
}


var lspeed=50;//randomIntFromInterval(10,15);//Random Range Function (random()*(max-min+1)+min)
var _rows;
var _cols;

var on = 0;
var _spins=0;

var interval0;
var interval1;
var interval2;
var interval3;
var interval4;
var interval5;
var interval6;

var check=0;

async function scrollSetup(rows,cols,spins) {
    if (isAnimating==1) {
        isAnimating=2;
    }
    if (interval!=null) {clearInterval(interval);}
    if (interval0!=null) {clearInterval(interval0);}
    if (interval1!=null) {clearInterval(interval1);}
    if (interval2!=null) {clearInterval(interval2);}
    if (interval3!=null) {clearInterval(interval3);}
    if (interval4!=null) {clearInterval(interval4);}
    if (interval5!=null) {clearInterval(interval5);}
    if (interval6!=null) {clearInterval(interval6);}
    

    while (isAnimating!=0) {
            await delay(0.1);
        }
    //wait until current animations have stopped
    if (isAnimating==0) {
        check++;
        gridSquares=[];
        scroll=new scrollGFX(scrollCanvas.width/2,scrollCanvas.width*.9);
        scrollObj = new scrollObject(scroll.getLaneCenter(2),100,30,50,0)
        scrollObj.y=0;
        _rows=rows;_cols=cols;_spins=spins;on=1;
        
        backdropSetup();
        loop(spins);
        
    }
}

function looper() {
   for(i=0; i<scrollOBJs.length; i++) {
       scrollOBJs[i].y=0;
       scrollOBJs[i].controls.forward=true;
       scrollOBJs[i].friction=0;
   }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i=0; i<scrollCTXs.length; i++) {
        scrollCTXs[i].clearRect(0,0, scrollCanvases[i].width, scrollCanvases[i].height);
    }

    bgImg.style.backgroundImage="url('src/images/gifs/gr1.gif')";
    gridSquares=[], paidLine=null;
    linesBaby(3,5);
    makeGameData(_rows,_cols);
    isAnimating=1;
    interval0 = setInterval(function() {
    
        scrollOBJs[0].y=13; scrollOBJs[1].y=13; scrollOBJs[2].y=13; scrollOBJs[3].y=13; scrollOBJs[4].y=13;
       
    }, 200)
    interval1 = setInterval(function() {
       
        //scrollOBJs[0].y=0;
        scrollOBJs[0].controls.forward=false;
        scrollOBJs[0].friction=1;
        on=2;
    }, 1000)
    interval2 = setInterval(function() {
        
        scrollOBJs[1].controls.forward=false;
        scrollOBJs[1].friction=1;
        on=3;
    }, 1480)
    interval3 = setInterval(function() {
        
        scrollOBJs[2].controls.forward=false;
        scrollOBJs[2].friction=1;
        on=4;
    }, 1970)
    interval4 = setInterval(function() {
        
        scrollOBJs[3].controls.forward=false;
        scrollOBJs[3].friction=1;
        on=5;
    }, 2460)
    interval5 = setInterval(function() {
        
        scrollOBJs[4].controls.forward=false;
        scrollOBJs[4].friction=1;
        on=6;
    }, 3200)

    interval6 = setInterval(function() {
       on=7;
       for (i=0; i<3; i++) {
           for (j=0; j<5; j++) {
               var icon = 0; var cValue=0;
               for (e=0; e<gridSquares.length; e++) {
                   if (gridSquares[e].gridX == j && gridSquares[e].gridY == i) {icon = gridSquares[e].icon; cValue = gridSquares[e].coinValue;break;}}
               if (document.getElementById(i+''+j) == null){createIconGfx(i+''+j,'backa',false,false,i,j, 3, 5,icon,cValue,false);}
           }
       }
    }, 5500)
}
     

function animate(time) {
    
    if (on>=1 && on<7) {
        isAnimating=1;
        requestAnimationFrame(animate);
        //deltaTime = (time - lastTimestamp) / perfectFrameTime;
        //lastTimestamp = time;
        for (i=0; i<scrollCanvases.length; i++) {
            scrollCanvases[i].style.display='block';
        }

        for (i=0; i<scrollers; i++) {
            scrollCanvases[i].height=260;
            scrollCanvases[i].style.left=110*i+'px';
            scrollOBJs[i].update();
            scrollCTXs[i].save();
            scrollCTXs[i].translate(0,scrollOBJs[i].y); //ar down the screen 0.7 = 70%
            scrollOBJs[i].maxSpeed=lspeed;
            
        }

        for (i=0; i<scrollers; i++) {
            for (j=0; j<_rows; j++) {
                var icon = 0; var cValue=0;
                for (e=0; e<gridSquares.length; e++) {
                    if (gridSquares[e].gridX == i&& gridSquares[e].gridY == j) {icon = gridSquares[e].icon; cValue = gridSquares[e].coinValue;break;}}
                    sCTX=scrollCTXs[i];
                    if (on-1 <= scrollers) {
                        scrollCTXs[i].save();
                        sCTX.drawImage(orcIcons[icon], 0, (j*82), 65, 65);
                    }
            }
        }

       
        scrollCtx.restore();
        
        
        //scroll.draw(scrollCtx); //draw the road effect
        //scrollObj.draw(scrollCtx,"blue");
        
        
    }
    if (on==7) {
        on=0;
        for (i=0; i<scrollCanvases.length; i++) {
            scrollCanvases[i].style.display='none';
        }
       winnerGFX(false);
       if (spinsLeft==0) {
        interval = setInterval(function () {
            winnerGFX(true);
        }, (lineTime+2)*1000);
    }
    }
}






