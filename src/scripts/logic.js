function payouts(paidInfo) {
    //Update Total Win GFX, pay money out here
    totalWin = 0;
    for (i=0; i<paidInfo.length; i++) {
        var iValue = findIValue(paidInfo[i][2], paidInfo[i][1]);
        var payout = parseFloat(iValue*playerVars.betPerLine);
        var money = parseFloat(playerVars.money);
        playerVars.money = payout+money;
        totalWin += payout;
    }

    //Add Free Spins/Trigger coin feature here
}

function findIValue(icon, cols) {
    var iValue = 0;
    for (x=0; x<gridSquares.length; x++) {
        if (gridSquares[x].icon == icon) {
            if (cols==3) {
                iValue=gridSquares[x].iValue[0];}
            else if (cols==4) {
                iValue=gridSquares[x].iValue[1];}
            else if (cols==5) {
                iValue=gridSquares[x].iValue[2];
            } 
            break;   
        }
    }
    return iValue;
}

function stopAutoSpin() {
    spinsLeft=0;
    autoSpinButton6.style.display = 'none';
    if (freeSpins==0){spinButton.disabled=false;autoSpinButton.disabled=false;
        upBetButton.disabled=false;upLinesButton.disabled=false;downBetButton.disabled=false;downLinesButton.disabled=false;titleLabel8.style.display='none';autoSpinButton.innerHTML='⟳';}
}

function spinLength(spins) {
    trackedSpinsLeft=spins;
    scrollSetup(200,5,spins);
    //loop(spins);
}