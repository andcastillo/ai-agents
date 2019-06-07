const Problem = require('../core/Problem');
const AgentController = require('../core/AgentController');

class CleanerProblem extends Problem {
    constructor(args) {
        this.env = args;
        this.controller = new AgentController();
    }

    /**
     * Check if the given solution solves the problem. You must override
     * @param {Object} solution 
     */
    goalTest(data) {
        let minX = min(data.world);
        if (data.interations >= 12)
            return true;
        if (minX == 0) {
            return true;
        }
        return false;
    }

    /**
     * The transition model. Tells how to change the state (data) based on the given actions. You must override
     * @param {} data 
     * @param {*} action 
     * @param {*} agentID 
     */
    update(data, action, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        if (action == "UP") {
            agentState.y -= 1;
        }
        if (action == "DOWN") {
            agentState.y += 1;
        }
        if (action == "LEFT") {
            agentState.x -= 1;
        }
        if (action == "RIGHT") {
            agentState.x += 1;
        }
        if (action == "TAKE") {
            map[agentState.y][agentState.x] = 0;
        }
        if (!data.interations) {
            data.interations = 1;
        } else {
            data.interations++;
        }
    }

    /**
     * Gives the world representation for the agent at the current stage
     * @param {*} agentID 
     * @returns and object with the information to be sent to the agent
     */
    perceptionForAgent(data, agentID) {
        let map = data.world;
        let agentState = data.states[agentID];
        let x = agentState.x;
        let y = agentState.y;
        let result = [];
        //LEFT
        result.push(x > 0 ? map[y][x - 1] : 1);
        //UP
        result.push(y > 0 ? map[y - 1][x] : 1);
        //RIGTH
        result.push(x < map[0].length - 1 ? map[y][x + 1] : 1);
        //DOWN
        result.push(y < map.length - 1 ? map[y + 1][x] : 1);
    
        result = result.map(value => value > 0 ? 1 : 0);
        //SMELL
    
        result.push(Math.abs(map[y][x]));
        return result;
    }

    solve(problem) {
        controller.setup({ world: problem, problem: this });
        controller.start({
            onFinish: (result) => {
                let agentID = result.actions[result.actions.length - 1].agentID;
                console.log("Winner " + agentID);
                console.log(result.actions);
                let world = JSON.parse(JSON.stringify(result.data.world));
                let agentState = result.data.states[agentID];
                world[agentState.y][agentState.x] = "X"
                console.log(world);
            }, onTurn: (result) => { console.log("Turn: " + result) }
        });
    }
}

module.exports = Problem;


function min(data) {
    let min = 9999999;
    for (let i = 0; i < data.length; i++) {
        let row = data[i];
        for (j = 0; j < row.length; j++) {
            if (row[j] < min) {
                min = row[j];
            }
        }
    }
    return min;
}
