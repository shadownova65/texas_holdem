class PokerGame {
    constructor() {
        this.allCards;
        this.dealerCards;
        this.bigBlindID = 0;
        this.startBetID = 0;
        this.lastID = 4;
        this.currentID = 0;
        this.currentPlayerIDArr = [0, 1, 2, 3, 4];
        this.currentPlayerIDIndex = 0;
        this.currentTurnIDArr = []; //nonfold players at current turn;
        this.turnStartIndex;
        this.turnEndIndex;
        this.turnCurrIndex;
        this.stageNum = 0;
        this.currStageSHPlayers = []; //show hand player at a stage. set to empty at end of each stage
        this.currentBet = 0; //! bet at current bet around
        this.pot = 0; //!change from currentTotalBet
        this.totalBetEl;
        this.players = (function(){
            let gamers = []
            for (let i = 0; i < 5; i++) {
                gamers.push(new PokerPlayer());
                // players.push(new PokerPlayer('player'+(i+1)));
            }
            return gamers
        })(); //! () is necessary!!
        // this.updatePlayersFunds = this.updatePlayersFunds.bind(this);
        // this.startBlind = this.startBlind.bind(this);
        this.updatePlayersFunds = this.updatePlayersFunds.bind(this);
        this.startBlind = this.startBlind.bind(this);
        this.updateTotalBet = this.updateTotalBet.bind(this);
        this.smallBind = this.smallBind.bind(this);
        this.nextStage = this.nextStage.bind(this);
    } //end of contributor
    
    //* get bet end index in cuurentTurnIDArr
    getEndIndex = (startIndex) => {
        return startIndex === 0? this.currentTurnIDArr.length-1: startIndex -1;
    }

    

    askForBet = () => {
        //! no check showhand and fold. will check when each player showhand or fold
        
        //? get index at currentTurnIDArr
        var turnStartIndex = this.currentTurnIDArr.indexOf(this.startBetID);
        var turnEndIndex;
        var turnCurrIndex = turnStartIndex;
        
        turnEndIndex = this.getEndIndex(turnStartIndex);
        console.log('start ask for bet from player' + turnStartIndex + ' to player' + turnEndIndex);

        for (let i = 0; i < this.currentTurnIDArr.length; i++) {
            let id = this.currentTurnIDArr[turnCurrIndex]
            console.log('hi player' + id);
            
            //? end of stage, all players finish bet 
            if (turnCurrIndex === turnEndIndex) {
                this.stageNum++;
                this.currStageSHPlayers = [];
                this.nextStage();
            }

            // let id = this.currentTurnIDArr[turnCurrIndex];
            console.log('ask player' + id);
            //? get to gamer, stop. game will control by buttons
            if (id === 2) {
                turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
                console.log("gamer's turn");
                return;
            }
            //? not gamer, computer will play
            //? don't do anything if player showHand
            if (this.players[id].showhand) {
                turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
                return;
            }
            console.log('computer' + id + "'s turn.");
            this.computerBet(this.players[id]);
            turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
        }              
    } // end of askforbet
    
    initIndex = () => {
        //! no check showhand and fold. will check when each player showhand or fold
        
        //? get index at currentTurnIDArr
        this.turnStartIndex = this.currentTurnIDArr.indexOf(this.startBetID);
        this.turnCurrIndex = this.turnStartIndex;
        
        this.turnEndIndex = this.getEndIndex(this.turnStartIndex);
        console.log('start ask for bet from player' + this.turnStartIndex + ' to player' + this.turnEndIndex);
    }
    askPlayerBet = () => {
        let id = this.currentTurnIDArr[this.turnCurrIndex]
        console.log('hi player' + id);
        
        //? end of stage, all players finish bet 
        if (this.turnCurrIndex === this.turnEndIndex) {
            this.stageNum++;
            this.currStageSHPlayers = [];
            this.nextStage();
        }

        // let id = this.currentTurnIDArr[turnCurrIndex];
        console.log('ask player' + id);
        //? get to gamer, stop. game will control by buttons
        if (id === 2) {
            this.turnCurrIndex < this.currentTurnIDArr.length-1? this.turnCurrIndex++ : this.turnCurrIndex = 0;
            console.log("gamer's turn");
            return;
        }
        //? not gamer, computer will play
        //? don't do anything if player showHand
        if (this.players[id].showhand) {
            this.turnCurrIndex < this.currentTurnIDArr.length-1? this.turnCurrIndex++ : this.turnCurrIndex = 0;
        }
        console.log('computer' + id + "'s turn.");
        this.computerBet(this.players[id]);
        this.turnCurrIndex < this.currentTurnIDArr.length-1? this.turnCurrIndex++ : this.turnCurrIndex = 0;
                     
    } // end of askPlayerBet



    showDealerCard = () => {

    }

    getResults = () => {

    }
    
    computerBet = (player) => {
        let betOptionCtl = Math.random();
        console.log('current bet is ' + this.currentBet);;
        //! 1. showHands, fold call
        //! 2. update total bet and other necessary info
        switch (true) {
            //todo do nothing if a player showed hand this turn.
            case player.showhand:
                break;

            //todo showhand or not; 1. showHands 2. fold
            //? showhands: 1. take player out of currentTurn 2. 
            case player.funds + player.playerBet < this.currentBet:
                betOptionCtl > 0.5 ? this.showHands(player) : this.Fold(player);
                break;

            //todo computer raise
            case betOptionCtl > 0.9:
                this.Raise(player);
                break;
            //todo computer fold    
            case betOptionCtl < 0.1:
                this.Fold(player);
                break;
            //todo computer call
            default:
                this.Call(player);
        }
    }

    showHands = (player) => {
        //? update player.showhand, update playerBet
        console.log('player' + this.players.indexOf(player) + ' showhand');
        player.showhand = true;
        player.betAtSH = player.funds + player.playerBet - this.currentBet;

        if (player.betAtSH > 0) {
            this.currentBet += player.betAtSH;
            this.startBetID = this.players.indexOf(player);
        }
        player.Bet(player.funds);
        
        this.updateSHPlayerPot(player.betAtSH);
        this.currStageSHPlayers.append(player);

        //? get win pot for showhand player. will update when other player sh less or fold
        let activePlayerNum = this.currentTurnIDArr.length - this.currStageSHPlayers.length
        player.potAtSH = this.pot + player.betAtSH * (activePlayerNum);
        player.playerBet += player.betAtSH;

        //? update bet, pot and display
        
        this.currentBet += player.betAtSH;
        
        //! check whether only one active player in current turn
        this.endTurnEarlyOrNot();
    }

    endTurnEarlyOrNot = () => {
        if (this.currentTurnIDArr.length - this.currStageSHPlayers.length === 1) {
            this.showDealerCard();
            this.getResults()
            this.endTurn()
            console.log('this turn end due to only 1 active player');
        }
    }

    updateSHPlayerPot = (currBet) => {
        //? no show hand player this stage
        if (this.currStageSHPlayers.length = 0) {
            return;
        }

        for (let SHplayer in this.currStageSHPlayers) {
            SHplayer.potAtSH = SHplayer.potAtSH + currBet - SHplayer.betAtSH;
        }
    }


    Fold = (player) => {
        //! check whether only one active player in current turn.
        let id = this.players.indexOf(player);
        console.log('player' + this.players.indexOf(player) + ' fold');
        player.fold = true;

        //* take player out
        this.currentTurnIDArr.splice(id, 1);
        this.updateSHPlayerPot(0);

        this.endTurnEarlyOrNot();

    }

    Call = (player) => {
        let bet = this.currentBet - player.playerBet;
        player.Bet(bet);
        console.log('player' + this.players.indexOf(player) + ' call $' + bet);
        this.updateTotalBet(bet);
    }

    Raise = (player) => {
        let raise = Math.round(Math.random() * 50) * 2;
        let call = this.currentBet - player.playerBet;
        while (raise > player.funds + call) {
            raise = Math.round(Math.random() * 50) * 2;
        }
        console.log('call ' + call + ', raise ' + raise);
        let amount = raise + call;
        player.Bet(amount);
        this.currentBet += raise;
        this.startBetID = this.players.indexOf(player);
        this.updateTotalBet(amount); 
    }


    nextStage = () => {
        this.currentBet = 0;

        //? if real person fold or sh hand last stage end turn immediately
        if ((!currentTurnIDArr.includes(2)) || player.showhand === true) {
            this.showDealerCard();
            this.getResults()
            this.endTurn()
            console.log('this turn end due to only gamer is inactive.');
        }

        switch(this.stageNum) {
            case 0:
                askForBet();
                break;
            case 1:
                showDealerCard();
                askForBet();
                break
            case 2:
                showDealerCard();
                askForBet();
                break;
            case 3:
                showDealerCard();
                getResults();
                break;        
        }
        // if (this.currentID === this.startBetID) {
        //     this.stageNum++;
        //     return;
        // }
    }
    updatePlayersFunds = () => {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].fundsEl.textContent = '$ ' + this.players[i].funds;
        }
    }
    updateTotalBet = (bet = 0) => {
        this.pot += bet;
        console.log('total bet: ' + this.pot);
        this.totalBetEl.textContent = '$ ' + this.pot;
    }

    startBlind = () => {
        if (this.currentPlayerIDArr.includes(this.bigBlindID)) {
            this.players[this.bigBlindID].Bet(1);
        } else {
            this.bigBlindID = this.getNextPlayerID(this.currentPlayerIDArr, this.bigBlindID);
            this.startBlind();
            return;
        }
        
        // console.log(this.bigBlindID,this.players[this.bigBlindID]);
        this.pot +=1;
        // console.log(this.currentTotalBet);
        setTimeout(this.updateTotalBet, 800);
        
        
        setTimeout(this.smallBind, 1600);
        
    }


    smallBind = () => {
        this.bigBlindID = this.getNextPlayerID(this.currentPlayerIDArr, this.bigBlindID);
        console.log(this.bigBlindID);
        this.players[this.bigBlindID].Bet(2);
        this.currentBet = 2;
        this.pot += 2;
        this.updateTotalBet();
        console.log('after blind, current bet is' + this.currentBet);
    }

    getNextPlayerID = (IDArr, ID) => {
        let id = IDArr.indexOf(ID);
        if (id + 1 >= IDArr.length) {
            id = 0;
        }
        else {
            id++;
        }
        return IDArr[id];
    }
    

    showResults = () => {
        
    }

    endTurn = () => {

    }
}//end of poker game


class PokerPlayer {
    constructor() {
        this.funds = 1000;
        this.fundsEl;
        this.hands = [];
        this.handsEl;
        this.fold = false;
        this.showhand = false;
        this.betAtSH = 0;
        this.potAtSH = 0;
        this.playerBet = 0; //total bet this turn(game)
        this.img;
        // this.showHands = this.showHands.bind(this);
        this.showCards = this.showCards.bind(this);
        this.Bet = this.Bet.bind(this);
    }

    Bet(bet) {
        this.playerBet += bet;
        this.funds -=bet;
        this.fundsEl.textContent = '$ ' + this.funds;
    }

    showCards(url0 = this.hands[0].image, url1 = this.hands[1].image) {
        this.handsEl.textContent = "";
        let card0 = document.createElement('img');
        let card1 = document.createElement('img');
        card0.src = url0;
        card1.src = url1;
        
        this.handsEl.appendChild(card0);
        this.handsEl.appendChild(card1);
        // console.log("player: " + this.handsEl);
    }



   
}

// var player1 = new PokerPlayer;
// var game1 = new PokerGame();
// console.log(game1);
// game1.players[0].showHands();

// var player1 = new PokerPlayer()
// console.log('start');
// console.log(player1.funds);
// player1.funds+=1000;
// console.log(player1.funds);

askAPlayer = (intervalHandle, turnCurrIndex, turnEndIndex) => {
    let id = this.currentTurnIDArr[turnCurrIndex];
    console.log('hi player' + id);
    
    //? end of stage, all players finish bet 
    if (turnCurrIndex === turnEndIndex) {
        clearInterval(intervalHandle);
        this.stageNum++;
        this.currStageSHPlayers = [];
        this.nextStage();
        return turnCurrIndex;
    }

    // let id = this.currentTurnIDArr[turnCurrIndex];
    console.log('ask player' + id);
    //? get to gamer, stop. game will control by buttons
    if (id === 2) {
        clearInterval(intervalHandle);
        turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
        console.log("gamer's turn");
        return turnCurrIndex;
    }
    //? not gamer, computer will play
    //? don't do anything if player showHand
    if (this.players[id].showhand) {
        turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
        return turnCurrIndex;
    }
    console.log('computer' + id + "'s turn.");
    this.computerBet(this.players[id]);
    turnCurrIndex < this.currentTurnIDArr.length-1? turnCurrIndex++ : turnCurrIndex = 0;
    return turnCurrIndex;
}