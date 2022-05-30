function linesBaby(rows,cols) {
    //Y then X
    lines = []; //arr to store lines

    for(j=0; j<playerVars.lines; j++) {
        do {var tempLine=[];for(a=0; a<cols; a++) {
            randNum = Math.floor(Math.random() * rows); //Assign random row
            tempLine.push([randNum,a]) 
        }} while (checkDuplicate(tempLine, lines, 'create', false) == true);
    }

}

function paidLines(gridSquares,lines) {
    paidInfo=[];
    //Add icon to Line
    for (i=0; i<lines.length; i++) {
        for (j=0; j<lines[i].length; j++) {
            //arrays of coords here [0] y, [1] x
            for(e=0; e<15; e++) {
                if ((lines[i][j][0] == gridSquares[e].gridY) && (lines[i][j][1] == gridSquares[e].gridX) && lines[i][j].length == 2) {
                    lines[i][j].push(gridSquares[e].icon);
                    break;
                }
            }
        }
    }
    //Check if line is payable
    for (i=0; i<lines.length; i++) {
        //find which icon is paying -- 8 is wild icon
        var payableIcon;
        for (j=0; j<lines[i].length; j++) {
            if (lines[i][j][2] != 8) {
                payableIcon = lines[i][j][2];break;}
            else if (j==4) {
                if (payableIcon==null&&lines[i][j][2] == 8) {
                    payableIcon = lines[i][j][2];console.log('icon 8 paid');break;//payable icon is 8 if we have 5 of them
                }
            }}

        //check if icon appears consecutively
        for (j=0; j<lines[i].length; j++) {
            //if first 3 columns dont contain our payable icon or wild - break
            if (j < 3) {
                if (lines[i][j][2] != 8 && lines[i][j][2] != payableIcon) {
                    break;}
                else if (lines[i][j][2] == 9 || lines[i][j][2] == 10) {
                    break;}}
            else {//pay this icon on this line, record line length
                if (lines[i][j][2] != 8 && lines[i][j][2] != payableIcon) {
                    paidInfo.push([i,j,payableIcon]);break;}
                else if ((lines[i][j][2] == 8 && lines[i][j][2] == payableIcon)&& j==4) {
                    paidInfo.push([i,j,payableIcon]);break;}
            }
        }
    }
    payouts(paidInfo);
    return paidInfo  
}

function makeGameData(rows,cols) {
    for (j=0; j<cols; j++) { for (i=0; i<rows; i++) {
        if (i==0 || i==rows-1 || j==0 || j==cols-1) { //Border
        }
        else {
            var randOrc = Math.floor(Math.random() * orcIcons.length);
            var bet = (playerVars.betPerLine*playerVars.lines);
            var coinVals = [bet*1, bet*2, bet*3, bet*4, bet*5, bet*6, bet*7, bet*8,bet*10,bet*14,bet*16,bet*18,bet*20,bet*24, 'mini', 'maj'];
            var randCoin= Math.floor(Math.random() * coinVals.length);
            var gridSquare = {gridY: i-1, gridX: j-1, icon: randOrc, iValue: iconVals(randOrc), coinValue: coinVals[randCoin]};  gridSquares.push(gridSquare);}} 
    }
    paidLine = paidLines(gridSquares,lines);
}

function createHTMLElement(element, id, className, text, div, xOffset, yOffset, width, height) {
    var t = document.createElement(element);
    t.className = className;t.id = id;t.innerText = text;
    if (element == 'canvas'){t.width=width;t.height=height;}
    centreElement(div, t, xOffset,yOffset);
}

function iconVals(icon) {
    var values = [];
    if (icon == 0) {values.push(5,20,50);}
    if (icon == 1) {values.push(5,20,50);}
    if (icon == 2) {values.push(5,20,50);}
    if (icon == 3) {values.push(5,20,50);}
    if (icon == 4) {values.push(10,50,200);}
    if (icon == 5) {values.push(15,100,300);}
    if (icon == 6) {values.push(20,150,400);}
    if (icon == 7) {values.push(25,250,500);}
    if (icon == 8) {values.push(0,0,500);}
    if (icon == 9) {values.push(0,0,0);}
    if (icon == 10) {values.push(0,0,0);}
    return values;
}

