const CleanerProblem = require('./CleanerProblem');
const CleanerAgent = require('./CleanerAgent');

let myProblem = new CleanerProblem({ maxIterations: 12 });

myProblem.addAgent("Smith", CleanerAgent, { x: 0, y: 2 });
let iterator = myProblem.interactiveSolve([[0, 0, 0, 0], [0, 1, 1, -1], [0, 1, 0, 0], [0, 0, 0, 1]], {
    onFinish: result => {
        let agentID = result.actions[result.actions.length - 1].agentID;
        console.log("Winner " + agentID);
        console.log(result.actions);
        let world = JSON.parse(JSON.stringify(result.data.world));
        let agentState = result.data.states[agentID];
        world[agentState.y][agentState.x] = "X";
        console.log(world);
    },
    onTurn: result => {
        console.log("Turn: " + JSON.stringify(result.actions[result.actions.length - 1]));
    }
});

iterator.next();
iterator.next();