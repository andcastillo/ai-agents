const CleanerProblem = require('./CleanerProblem');
const CleanerAgent = require('./CleanerAgent');

let myProblem = new CleanerProblem();

myProblem.addAgent("Smith", CleanerAgent, {x: 0, y: 2});
myProblem.solve([
    [0, 0, 0, 0 ],
    [0, 1, 1, -1],
    [0, 1, 0, 0],
    [0, 0, 0, 1]]);



