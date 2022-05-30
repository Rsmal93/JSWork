let SQUARES = [];
let LINES = [];
let AMT_LINES = 25;
let ROWS = 3;
let COLUMNS = 5;

function lineGenerator(amount,rows,cols,generateFirst) {
    //Y then X
    LINES = []; //arr to store lines

    for (i=0; i<AMT_LINES; i++) {
        //do {
            var tempLine=[]; // hold a random line until its ready
            for (a=0; a<cols; a++) {
                var randNumber = Math.floor(Math.random()*rows); //Assign a random row for each col


            }
        //}
    }
    for(j=0; j<playerVars.lines; j++) {
        do {var tempLine=[];for(a=0; a<cols; a++) {
            randNum = Math.floor(Math.random() * rows); //Assign random row
            tempLine.push([randNum,a]) 
        }} while (checkDuplicate(tempLine, lines, 'create', false) == true);
    }

}


function checkDuplicate(exLine, lines, id, complete) { //(checked line, generated lines, what function)
    //check if our line is a duplicate
    for (x=0; x<lines.length; x++) {
        var count=0; //counter for matches against a real line
        if (!complete) {for (z=0; z<lines[x].length-2; z++) { //need 'x' max lines in first 3 cols
                if (arraysEqual(exLine[z],lines[x][z])) {if(exLine[z][1]==count){count++;}}}}
        else {
            for (z=0; z<lines[x].length; z++) { //check entire line for dupe
                if (arraysEqual(exLine[z],lines[x][z])) {if(exLine[z][1]==count){count++;}}}
        }

        if (id=='compare'){
            if (count>=3) { //if our line matches an existing line
               //Create a new line to return that matches the paid line
                var _line = [], ogLine=[];
                for (z=0; z<lines[x].length; z++) {_line.push(lines[x][z]);ogLine.push(lines[x][z]);}
                //Adjust size of new line depending on icons hit
                if(_line.length > count) {_line.pop();if(_line.length > count){_line.pop();}}
                return [x,ogLine,_line]; //return package of line number, original line and the line we hit
            } 
        }
        if (!complete) {if (count==lines[x].length-2) { if (id=='create') {return true;}}}  //if this is a duplicate to line
        else {if (count==lines[x].length) { if (id=='create') {return true;}}}  //if this is a duplicate to line
    }
    if (id=='create') {lines.push(exLine);return false;}  //not a dupe
}

class Square {
    constructor(x,y,sqWidth,sqHeight,iWidth,iHeight,icon,values,coinValue) {
        this.x=x;
        this.y=y;
        this.sqWidth=sqWidth;
        this.sqHeight=sqHeight;
        this.iWidth=iWidth;
        this.iHeight=iHeight;
        this.icon=icon;
        this.values=values;
        this.coinValue=coinValue;
    }
}