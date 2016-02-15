var Split = require('./split');

// Based on Melbourne Cup 2015
// http://www.races.com.au/melbourne-cup/melbourne-cup-history/facts-and-statistics/

//Create a new instance of split
var split = new Split(100); // pass Split the total amount you want to spend on the event.

// Add each competitor to the event, with their ID and Odds
split.addItem(1, 51);   // SNOW SKY (16)
split.addItem(2, 19);   // CRITERION (4)
split.addItem(3, 5);    // FAME GAME (12)
split.addItem(4, 21);   // OUR IVANHOWE (22)
split.addItem(5, 61);   // BIG ORANGE (23)
split.addItem(6, 31);   // HARTNELL (17)
split.addItem(7, 41);   // HOKKO BRAVE (20)
split.addItem(8, 14);   // MAX DYNAMITE (2)
split.addItem(9, 26);   // RED CADEAUX (8)
//split.addItem(10, 6.5); // TRIP TO PARIS (14) // Favourite - Will typically mathematically distrupt the odds. Bet on it individually if you really think it has a chance..
split.addItem(11, 21);  // WHO SHOT THEBARMAN (6)
split.addItem(12, 34);  // SKY HUNTER (7)
split.addItem(13, 31);  // THE OFFER (13)
split.addItem(14, 61);  // GRAND MARSHAL (15)
split.addItem(15, 9);   // PREFERMENT (11)
split.addItem(16, 81);  // QUEST FOR MORE (21)
split.addItem(17, 17);  // ALMOONQITH (10)
split.addItem(18, 61);  // KINGFISHER (9)
//split.addItem(19, 101); // PRINCE OF PENZANCE (1) // Outlier - removed from calculation
split.addItem(20, 21);  // BONDI BEACH (18)
//split.addItem(21, 101); // SERTORIUS (5) // Outlier - removed from calculation
split.addItem(22, 21);  // THE UNITED STATES (3)
split.addItem(23, 34);  // EXCESS KNOWLEDGE (24)
split.addItem(24, 41);  // GUST OF WIND (19)

console.log('Juggling fire, please wait..');
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
