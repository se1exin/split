/**
 * Split! - A simple gambling library for betting on every competitor and winning no matter what
 * Author: selexin
 * https://github.com/se1exin/split
 * Version 1.0.0 - 2016/2/16
 */

/**
 * class SplitItem
 *  A single competitor in a gambling event
 *  
 * @param mixed id - A unique identifier for the competitor. E.g. '1'
 * @param float odds - The odds for the competitor
 */
 function SplitItem(id, odds) {
    this.id = id; // Unique identifier for this competitor
    this.odds = odds; // The odds for this competitor given to you by your favourite respectable gambling vendor
    this.bet = 0; // How $much you should bet on this competitor
    this.result = 0; // How $much you will be paid if this competitor wins
    this.resultLessBet = 0; // How $much you will profit from this individual bet (not including other bets)
    this.profit = 0; // How $much you will actually profit in total from this bet
}

/**
 * function calcBet
 *  Calculates the current betting results for the competitor
 *  
 * @param float bet 
 */
SplitItem.prototype.calcBet = function(bet, spend) {
    this.bet = bet;
    this.result = this.odds * this.bet;
    this.resultLessBet = this.result - this.bet;
    this.profit = this.result - spend;
};

/**
 * function print
 *  Helper function to print (console.log) the outcome of this competitor
 */
SplitItem.prototype.print = function(bet, spend) {
    console.log('('+ this.id + ') Bet: $' +  this.bet.toFixed(2) + ', Win: $' + this.result.toFixed(2) + ', Less Bet: $' + this.resultLessBet.toFixed(2) + ', Profit: $' + this.profit.toFixed(2));
};


/**
 * class Split
 *  Represents a gambling event, holding all competitors and providing betting calculations for each
 *  
 * @param float spend - The total amount wished to be gambled on this event
 */
function Split(spend) {
    this.spend = spend;
    this.oddsTotal = 0; // Keeps track of the accumaltive odds total. Used to determine the iterations required to calculate all results 
    this.betIncrement = 0.01; // Adjust bets with an accuracy of 1c
    this.items = []; // Array to hold all of the competitors
}

/**
 * function addItem
 *  Adds a single competitor to the event. See class SplitItem for competitor implementation
 *  
 * @param mixed id - A unique identifier for the competitor. E.g. '1'
 * @param float odds - The odds for the competitor
 */
Split.prototype.addItem = function(id, odds) {
    this.items.push(new SplitItem(id, odds)); // Add the competitor to the event
    this.resetSplits(); // Recalculate bet divisions
    this.oddsTotal += odds; // Update the event's accumulative odds total
};

/**
 * function resetSplits
 *  Iterates every competitor in the event and calculates their starting bet amount
 */
Split.prototype.resetSplits = function() {
    for(var i=0;i<this.items.length;i++) { // Loop through every competitor
        // The initial bet is simply the total number of competitors divided by the total spend for the event
        this.items[i].calcBet(this.spend / this.items.length, this.spend);
    }
};

/**
 * function highestItemIndex
 *  Finds the competitor than that currently has the best/highest profit
 *  
 * @return int - The index of the highest paying competitor from the this.items array
 */
Split.prototype.highestItemIndex = function() {
    highestIndex = null;
    highestResult = 0; // Track the currently found best profit
    for(var i=0;i<this.items.length;i++) { // Loop all competitors
        if(this.items[i].result > highestResult) { // If this competitor has the best profit found yet..
            highestIndex = i; // Flag the competitor as the best found yet
            highestResult = this.items[i].result; // Update our local best profit comparison
        }
    }
    return highestIndex;
};

/**
 * function lowestItemIndex]
 *  Finds the competitor than that currently has the worst/lowest profit
 *  
 * @return int - The index of the lowest paying competitor from the this.items array
 */
Split.prototype.lowestItemIndex = function() {
    highestIndex = this.highestItemIndex();
    lowestIndex = null;
    lowestResult = this.items[highestIndex].result; // Track the currently found worst profit. Start with the current highest profiting competitor
    for(var i=0;i<this.items.length;i++) { // Loop all competitors
        if(this.items[i].result < lowestResult) { // If this competitor has the worst profit found yet..
            lowestIndex = i; // Flag the competitor as the worst found yet
            lowestResult = this.items[i].result; // Update our local best profit comparison
        }
    }
    return lowestIndex;
};

/**
 * function gamble
 *  Magic voodoo snakecharmerthat figures out how much to bet on each competitor to get the best possible betting results
 *  
 * @return Array - All competitors (as class SplitItem) with their calculated betting results 
 */
Split.prototype.gamble = function() {
    /**
     * gamble() works by looping and looping and looping all competitors until it has calculated the best possible betting outcome.
     * This is essentially achieved by moving cents ($0.01) from the least deserving competitor (that with the highest/best profit)
     * to the most deserving competitor (that with the lowest/worst profit) over and over again until all comptitors have the equal-est
     * distribution of the total spend.
     */
    
    // How many times we need to loop - Total spend, divided by the $ amount to be moved between competitors, times the accumulative total of odds
    var iterations = this.spend / this.betIncrement * this.oddsTotal;
    for(var i=0; i<iterations; i++) {
        lowestIndex = this.lowestItemIndex(); // Find the current worst competitor
        highestIndex = this.highestItemIndex(); // Find the current best competitor
        this.items[highestIndex].calcBet(this.items[highestIndex].bet - this.betIncrement, this.spend); // Take money from the best competitor
        this.items[lowestIndex].calcBet(this.items[lowestIndex].bet + this.betIncrement, this.spend); // Give money to the worst competitor
    }
    return this.items;
};

/**
 * function winning
 *  Convenience function for determining if the return from betting on this event is more than the total spend
 * 
 * @return Boolean - True/False to if the betting results will actually make money on this event
 */
Split.prototype.winning = function() {
    for(var i=0;i<this.items.length;i++) {
        if(this.items[i].result <= this.spend) {
            return false;
        }
    }
    return true;
};

// Exports for nodejs
module.exports = {
    Split: Split
};