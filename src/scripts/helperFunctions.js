function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
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

//Centre buttons on the 'Stage' Div
function centreElement(stage, item, xOffset, yOffset) {
    document.getElementById(stage).appendChild(item);
    document.getElementById(stage).lastChild.style.position='absolute';
    document.getElementById(stage).lastChild.style.top=yOffset+"px";
    document.getElementById(stage).lastChild.style.left=xOffset+"px";
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function lerp(A,B,t) {
    return A+(B-A)*t
}

function randomIntFromInterval(min,max) { //min & max included
    return Math.floor(Math.random() * (max-min+1)+min);
} 





