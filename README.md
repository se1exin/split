# Split! - A simple gambling library for betting on every competitor and winning no matter what* 
***What?!*** 
 
So you are willing to gamble $10 on the next big event, but you can't decide who's going to win! If only you could bet on every single competitor and still come out on top. ..well now you can. 
 
Split! works by using math voodoo to divide your total betting spend across every competitor in an event to figure out exactly how much you need to bet on each individual so that you win no matter what. 
 
*Does not work with all odds vendors due to Math. For example TAB (Australia) seems to have figured out how to calculate their odds so that there is no way for you to profit by betting on every competitor. This can usually be circumvented by excluding outliers in the event. That being said, I have found betting on European horse races (via Bet365) to be the most reliable and profitable.
 
**Works best with fixed odds events; If the odds for an event change after you run Split!, your Split! results may very well no longer be accurate and profitable

### Run the demo
* Install [node js](https://docs.npmjs.com/getting-started/installing-node)
* Clone the repo (git clone git@github.com:se1exin/split.git)
*  [optional] "I use a GUI for git". Fire up a terminal and cd to where you cloned to. Uninstall your GUI. Learn how to use a CLI.
*  run 'node demo.js'

*Example output:*
```javascript
Juggling fire, please wait..
(1) Bet: $2.00, Win: $102.10, Less Bet: $100.10, Profit: $2.10
(2) Bet: $5.39, Win: $102.45, Less Bet: $97.05, Profit: $2.45
(3) Bet: $20.47, Win: $102.36, Less Bet: $81.89, Profit: $2.36
(4) Bet: $4.88, Win: $102.52, Less Bet: $97.64, Profit: $2.52
(5) Bet: $1.68, Win: $102.60, Less Bet: $100.91, Profit: $2.60
(6) Bet: $3.30, Win: $102.36, Less Bet: $99.06, Profit: $2.36
(7) Bet: $2.50, Win: $102.58, Less Bet: $100.08, Profit: $2.58
(8) Bet: $7.31, Win: $102.37, Less Bet: $95.05, Profit: $2.37
(9) Bet: $3.94, Win: $102.49, Less Bet: $98.55, Profit: $2.49
(11) Bet: $4.88, Win: $102.52, Less Bet: $97.64, Profit: $2.52
(12) Bet: $3.01, Win: $102.40, Less Bet: $99.39, Profit: $2.40
(13) Bet: $3.30, Win: $102.36, Less Bet: $99.06, Profit: $2.36
(14) Bet: $1.68, Win: $102.60, Less Bet: $100.91, Profit: $2.60
(15) Bet: $11.38, Win: $102.44, Less Bet: $91.06, Profit: $2.44
(16) Bet: $1.27, Win: $103.02, Less Bet: $101.75, Profit: $3.02
(17) Bet: $6.02, Win: $102.37, Less Bet: $96.35, Profit: $2.37
(18) Bet: $1.68, Win: $102.60, Less Bet: $100.91, Profit: $2.60
(20) Bet: $4.88, Win: $102.52, Less Bet: $97.64, Profit: $2.52
(22) Bet: $4.88, Win: $102.52, Less Bet: $97.64, Profit: $2.52
(23) Bet: $3.01, Win: $102.40, Less Bet: $99.39, Profit: $2.40
(24) Bet: $2.50, Win: $102.58, Less Bet: $100.08, Profit: $2.58

Congrats! All bets will win.
```

### How to use
See demo.js for a full example. See 'Run the demo' above for how to run the demo with nodejs
```javascript
//Create a new instance of split
var split = new Split(100); // pass Split the total amount you want to spend on the event.

// Add each competitor to the event, with their ID and Odds
split.addItem(1, 51);   // SNOW SKY (16)
split.addItem(2, 19);   // CRITERION (4)
split.addItem(3, 5);    // FAME GAME (12)
...

// Perform Split! calculation
var results = split.gamble();

// Print the results
for(var i in results) {
  results[i].print();
}

// Will the group of bets actually profit??
if(split.winning()) {
  console.log('\r\nCongrats! All bets will win.');
} else {
  console.log('\r\nBugger! Odds aren\'t in your favour.. try removing some outliers.');
}
```