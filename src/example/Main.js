const tf = require('@tensorflow/tfjs-node');
const Agent = require('../core/Agent');
const AgentController = require('./AgentController');

let problem = tf.tensor2d([
    [0, 0, 0, 0 ],
    [1, 0, 0, 1],
    [-1, 0, 0, 0],
    [0, 0, 1, 0]]);

let solution = function(world) {
    if(world.min() == 0) {
        return true;
    }
    return false;
}

let update = function(world, action, agentID) {

}



let agent1 = new AgentContainer("Smith");

let container = new AgentController();
container.setup({world: problem, solution: solution});
container.register(agent1);
container.start(result => {
    console.log("Winner " + result.actions[this.result.actions.length - 1].agentID)
    console.log(result.actions);
});