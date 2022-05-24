async function gameScreen(rows,cols) {
    //Generate Positions first then animate
    var _rows=rows+=2; var _cols=cols+=2;
    gridSquares=[], paidLine=null;
    makeGameData(rows,cols);
    isAnimating=1; //0 for null, 1 for on, 2 for off
    bgImg.style.backgroundImage="url('src/images/gifs/gr1.gif')";

    //Put Real Icon in Position
    for (j=0; j<_cols; j++) {await(delay(0.2));
        for (i=0; i<_rows; i++) {
            if (i==0 || i==_rows-1 || j==0 || j==_cols-1) { //Draw Border
                if (document.getElementById(i+''+j) == null){createIconGfx(i+''+j,'backa',true,false, i,j, _rows, _cols,0,0); }} 
            else { //Draw The Game Grid, //backa0 is transparent img, change to whatever
                var icon = 0; var cValue=0;
                for (e=0; e<gridSquares.length; e++) {
                    if (gridSquares[e].gridX == j-1 && gridSquares[e].gridY == i-1) {icon = gridSquares[e].icon; cValue = gridSquares[e].coinValue;break;}}
                if (document.getElementById(i+''+j) == null){createIconGfx(i+''+j,'backa',false,false,i,j, _rows, _cols,icon,cValue);}}  
    }}
    if (isAnimating == 2) {isAnimating=0;return}
    winnerGFX();
    if (spinsLeft==0) {
        interval = setInterval(function () {
            winnerGFX();
        }, (lineTime+2)*1000);
    }

}

function betLabelDisplay(direction) {
    if (direction=='up') {
        if (playerVars.betPerLine < 0.9) {
            if (playerVars.betPerLine < 0.1) {playerVars.betPerLine+=0.01;}
            else {playerVars.betPerLine+=0.1;}
        betLabel2.innerHTML=parseFloat(playerVars.betPerLine).toFixed(2);
        betLabel4.innerHTML = (playerVars.betPerLine*playerVars.lines).toFixed(2);
        }
    } else {
        if (playerVars.betPerLine >= 0.11) {
            playerVars.betPerLine-=0.1;
        } else if (playerVars.betPerLine >= 0.01) {
            playerVars.betPerLine-=0.01;
        }
        betLabel2.innerHTML=parseFloat(playerVars.betPerLine).toFixed(2);
        betLabel4.innerHTML = (playerVars.betPerLine*playerVars.lines).toFixed(2);
    }
    titleLabel3.innerHTML = ((playerVars.betPerLine*playerVars.lines)*25).toFixed(2); //mini
    titleLabel5.innerHTML = ((playerVars.betPerLine*playerVars.lines)*100).toFixed(2);  //major
    titleLabel7.innerHTML = ((playerVars.betPerLine*playerVars.lines)*1000).toFixed(2);  //mega
    
}

function linesLabelDisplay(direction) {
    if (direction=='up') {
        if (playerVars.lines < 27) {
        playerVars.lines+=1;
        linesLabel2.innerHTML=playerVars.lines;
        betLabel4.innerHTML = (playerVars.betPerLine*playerVars.lines).toFixed(2);
        }
    } else {
        if (playerVars.lines > 2) {
        playerVars.lines-=1;
        linesLabel2.innerHTML=playerVars.lines;
        betLabel4.innerHTML = (playerVars.betPerLine*playerVars.lines).toFixed(2);
        }
    }
    titleLabel3.innerHTML = ((playerVars.betPerLine*playerVars.lines)*25).toFixed(2); //mini
    titleLabel5.innerHTML = ((playerVars.betPerLine*playerVars.lines)*100).toFixed(2);  //major
    titleLabel7.innerHTML = ((playerVars.betPerLine*playerVars.lines)*1000).toFixed(2);  //mega
    
}

async function winnerGFX() {
    //lineDisplay();
    if (paidLine!=null){lineTime=1;
        for (i=0; i<paidLine.length; i++) {
            for (j=0; j<lines.length; j++) {
                if (paidLine[i][0]==j) { //if this is the paid lines
                    var gifs = ['stars','sky','gr2']; var url = 'src/images/gifs/'+gifs[Math.floor(Math.random() * gifs.length)]+'.gif';
                    gambleButton.style.display='block';collectButton.style.display='block';
                    for (f=0; f<lines.length; f++) {
                        for (e=0; e<5; e++) {
                            var parent = document.getElementById('backa'+ (lines[f][e][0]+1)+''+(lines[f][e][1]+1));
                            if (parent!=null) {
                                parent.style.backgroundImage = "url('src/images/gifs/backa.gif')";
                                    //Change winning icon? if you want
                                var child = parent.children;//child[0].style.backgroundImage = "url('src/images/gifs/stars.gif')"
                                if (child!=null) {child[0].style.animation="";}
                            } 
                        }
                    }
                    
                    for (e=0; e<paidLine[i][1]; e++) {
                        var parent = document.getElementById('backa'+ (lines[j][e][0]+1)+''+(lines[j][e][1]+1));
                        if (paidLine[i][2] != 9) {
                            if (parent!=null) {
                            parent.style.backgroundImage = "url("+url+")";
                            //Change winning icon? if you want
                            var child = parent.children;//child[0].style.backgroundImage = "url('src/images/gifs/stars.gif')"
                            if (paidLine[i][2] != 9) {if (child!=null) {child[0].style.animation="spin2 4s linear infinite";}}
                        }}
                    }
                    payoutLabel1.innerHTML='TOTAL WIN'; payoutLabel2.innerHTML=totalWin.toFixed(2);
                    moneyLabel2.innerHTML=parseFloat(playerVars.money).toFixed(2);
                    if (paidLine[i][2]!= 9) {
                        var iValue = findIValue(paidInfo[i][2], paidInfo[i][1]);
                        var payout = parseFloat(iValue*playerVars.betPerLine);
                        payoutLabel3.innerHTML='LINE '+paidInfo[i][0];payoutLabel4.innerHTML=payout.toFixed(2);}
                    break;
                
                } 
            }lineTime+=1.5;if (isAnimating == 2) {isAnimating=0;return};await delay(1.5); //move this to a new interval when not so fkn tired
        }
    }
    scatterGFX(gridSquares);
    coinsGFX(gridSquares);
    isAnimating=0;
    
}

async function scatterGFX(gridSquares) {
    var count=0;
    var scatters=[];
    for (i=0; i<gridSquares.length; i++) {
        if (gridSquares[i].icon == '9') {
            count++; scatters.push([gridSquares[i].gridY+1, gridSquares[i].gridX+1]);
        }
    }
    if (count >=3) {
        lineTime+=1.5;
        bgImg.style.backgroundImage="url('src/images/gifs/scatter.gif')";bgImg.style.backgroundSize='720px 410px';
        payoutLabel3.innerHTML='Scatter';payoutLabel4.innerHTML=count;
        freeSpins+=5;
        spinButton.disabled=true;
        autoSpinButton.disabled=true;
        stopAutoSpin();//break autospin
        for (a=0; a<scatters.length; a++) {
            var parent = document.getElementById('backa'+scatters[a][0]+''+scatters[a][1]);
            if (parent!=null){//parent.style.backgroundImage = "url('src/images/gifs/scatter.gif')";
            var child = parent.children;//child[0].style.backgroundImage = "url('src/images/gifs/stars.gif')";
            child[0].style.animation="spin1 1s linear infinite";}
            if (isAnimating == 2) {isAnimating=0;return}await delay(0.33);}
        titleLabel8.style.display='block';//free spins label
    }
}

async function coinsGFX(gridSquares) {
    var count=0;
    var scatters=[];
    var hit=false;
    for (i=0; i<gridSquares.length; i++) {
        if (gridSquares[i].icon == '10') {
            count++; scatters.push([gridSquares[i].gridY+1, gridSquares[i].gridX+1]);
        }
    }
    if (count >=6) {
        lineTime+=1.5;
        bgImg.style.backgroundImage="url('src/images/gifs/gr2.gif')";bgImg.style.backgroundSize='720px 410px';
        payoutLabel3.innerHTML='Feature';payoutLabel4.innerHTML=count;
        hit=true;
        stopAutoSpin();//break autospin
        for (a=0; a<scatters.length; a++) {
            var parent = document.getElementById('backa'+scatters[a][0]+''+scatters[a][1]);
            if (parent!=null){//parent.style.backgroundImage = "url('src/images/gifs/scatter.gif')";
            var child = parent.children;//child[0].style.backgroundImage = "url('src/images/gifs/stars.gif')";
            child[0].style.animation="spin1 3s linear infinite";}
            if (isAnimating == 2) {isAnimating=0;return}await delay(0.33);}
    }
    if (!hit) {
        if (freeSpins > 0) {
            if (isAnimating == 2) {isAnimating=0;}
            autoSpinButton6.style.display = 'none';
            titleLabel8.style.display = 'block';
            autoSpinButton.innerHTML=freeSpins;
            await delay(1.5);
            loop(freeSpins);
            return;
        } else if (spinsLeft >= 0) {
            if (isAnimating == 2) {isAnimating=0;}
            if (spinsLeft > 1) {autoSpinButton6.style.display = 'block';}
            titleLabel8.style.display = 'none';
            await delay(1.5);
            loop(spinsLeft);
        } else {
            stopAutoSpin();
        }
    }
     
}

function autoSpinMenu() {
    if (autoSpinButton6.style.display == 'none') {
        if (autoSpinButton2.style.display != 'none') {
            autoSpinButton2.style.display = 'none';
            autoSpinButton3.style.display = 'none';
            autoSpinButton4.style.display = 'none';
            autoSpinButton5.style.display = 'none';
        } else {
            autoSpinButton2.style.display = 'block';
            autoSpinButton3.style.display = 'block';
            autoSpinButton4.style.display = 'block';
            autoSpinButton5.style.display = 'block';
        }
    }
}

function createScrollGfx(){}

function createIconGfx(id, gfx, border, temp, row, col, rows, cols, icon, cValue) {
    //The Background for the Icon
    var newDiv = document.createElement('div');
    newDiv.className = 'space';newDiv.id = gfx+''+i+''+j;
    var url = 'src/images/gifs/'+gfx+'.gif';newDiv.style.backgroundImage="url("+url+")";
    newDiv.style.left = (backgroundImage2.width/cols)*col+'px';
    newDiv.style.top = (backgroundImage2.height/rows)*row+'px';
    newDiv.style.position = 'absolute';
    document.getElementById('stage').appendChild(newDiv);

    //The Icon Itself
    var newDiv2 = document.createElement('div');
    newDiv2.className = 'icon';
    newDiv2.id = id;
    if (border){ //this is an edge locaion
        //var randBird = Math.floor(Math.random() * birdIcons.length); 
        //var url = 'src/images/icons/icon'+randBird+'.png';
        //newDiv2.style.backgroundImage="url("+url+")"; 
    } else { //Draw Orc Icon
        if (!temp){
            var url = 'src/images/icons/ball'+icon+'.png';
            newDiv2.style.backgroundImage="url("+url+")";
        } else {
            var url = 'src/images/gifs/orcswap.gif';
            newDiv2.style.backgroundImage="url("+url+")";
        }
        
        newDiv2.style.backgroundSize = '65px 65px';
        newDiv2.style.backgroundRepeat = 'no-repeat';
        newDiv2.style.backgroundPosition = 'center';
    }
    document.getElementById(newDiv.id).appendChild(newDiv2);

    //Does this icon need a value?
    if (icon==10) {
        var mLabel = document.createElement('label');
        mLabel.className = 'title8';
        if (cValue != 'mini' && cValue != 'maj') {
        mLabel.innerHTML = cValue.toFixed('2');
        } else {
            mLabel.innerHTML = cValue;
        }
        mLabel.style.position = 'relative';
        mLabel.style.top = '-72px';
        mLabel.style.left = '24px';
        mLabel.style.fontSize = '26px';

        document.getElementById(newDiv.id).appendChild(mLabel);
    }
}
