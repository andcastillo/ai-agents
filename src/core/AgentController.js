
class AgentController {
    constructor() {
        this.agents = {};
        this.world0 = null;
        this.world = null;
        this.actions = [];
    }

    setup(parameter) {
        this.world0 = JSON.parse(JSON.stringify(parameter.world));
        this.data = {world: JSON.parse(JSON.stringify(parameter.world)), states: {}};
        this.solution = parameter.solution;
        this.update = parameter.update;
        this.problemCallback = parameter.callback;
        this.perceptionForAgent = parameter.perceptionForAgent;
    }

    register(agent, state0) {
        if (this.agents[agent.getID()]) {
            throw 'AgentIDAlreadyExists';
        } else {
            this.agents[agent.getID()] = agent;
            this.data.states[agent.getID()] = state0;
        }
    }

    unregister(input) {
        let id = "";
        if (typeof input == 'string') {
            id = input;
        } else if (typeof input == 'object') {
            id = input.getID();
        } else {
            throw 'InvalidAgentType';
        }
        let agent = this.agents[id];
        agent.stop();
        delete this.agents[id];
    }

    start(callbacks = {}) {
        this.callbacks = callbacks;
        this.loop();
    }

    loop() {
        let stop = false;
        while (!stop) {
            //Creates a thread for every single agent
            Object.values(this.agents).forEach(agent => {
                if (!this.solution(this.data)) {
                    agent.receive(this.perceptionForAgent(this.getData(), agent.getID()));
                    let action = agent.send();
                    this.actions.push({agentID: agent.getID(), action});
                    this.update(this.data, action, agent.getID());
                    if (this.solution(this.data)) {
                        stop = true;
                    } else {
                        if(this.callbacks.onTurn)
                            this.callbacks.onTurn(action);
                    }
                }
            });
        }
        this.finishAll();
    }

    finishAll() {
        // Stop all the agents
        Object.values(this.agents).forEach(agent => {
            //agent.stop();
            this.unregister(agent);
        });
        //Execute the callback
        if(this.callbacks.onFinish)
            this.callbacks.onFinish({actions: this.getActions(), data: this.data});
    }

    getData() {
        return this.data;
    }

    getActions() {
        return JSON.parse(JSON.stringify(this.actions));
    }


    stop() {

    }
}

module.exports = AgentController;