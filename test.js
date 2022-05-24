var grid = [[0,0],[1,0],[2,0],[3,0]];

var grid2=[[0],[1],[2]]

// This loop is for outer array
for (var i = 0, l1 = grid.length; i < l1; i++) {
    //console.log(grid[i]); 
    // This loop is for inner-arrays
    for (var j = 0, l2 = grid[i].length; j < l2; j++) {
        // Accessing each elements of inner-array
        console.log(grid[i][j])
        grid[i].push([j].push("USA"));
        console.log(grid[i][j][0])
    }
}

// This loop is for outer array
for (var i = 0, l1 = grid2.length; i < l1; i++) {
    // This loop is for inner-arrays
    for (var j = 0, l2 = grid2[i].length; j < l2; j++) {
        // Accessing each elements of inner-array
        //console.log(grid2[i][j])
        
    }
}

//console.log(grid)
//console.log(grid2)


