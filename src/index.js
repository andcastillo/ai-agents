const tf = require('@tensorflow/tfjs-node');
const Agent = require('./Agent');
const Container = require('./Container');

let problem = tf.tensor2d([
    [0, 0, 0, 0 ],
    [1, 0, 0, 1],
    [-1, 0, 0, 0],
    [0, 0, 1, 0]]);

let solution = function(world) {
    if(problem.min() == 0) {
        return true;
    }
    return false;
}

let send = function(view) {
    let viewKey = view.join();
    if(this.table[viewKey]) {
        return this.actions[this.table[viewKey]];
    } else {
        return this.actions["default"];
    }
}

let update = function(world, action, agentID) {
    
}

let table = {
    "0,0,0,0,0": "UP",
    "0,0,0,1,0": "UP",
    "0,0,1,0,0": "UP",
    "0,0,1,1,0": "LEFT",
    "0,1,0,0,0": "LEFT",
    "0,1,0,1,0": "RIGHT",
    "0,1,1,0,0": "LEFT",
    "0,1,1,1,0": "LEFT",
    "1,0,0,0,0": "UP",
    "1,0,0,1,0": "RIGHT", 
    "1,0,1,0,0": "DOWN",
    "1,0,1,1,0": "UP",
    "1,1,0,0,0": "RIGTH",
    "1,1,0,1,0": "RIGHT",
    "1,1,1,0,0": "DOWN",
    "default": "TAKE"
            };

let agent1 = new Agent("Smith");

agent1.setup({table});
agent1.prototype.send = send;

let container = new Container();
container.setup({world: problem, solution: solution});
container.register(agent1);
container.start(result => {
    console.log("Winner " + result.actions[this.result.actions.length - 1].agentID)
    console.log(result.actions);
});