import { expectPromiseToFail } from "@tensorflow/tfjs-core/dist/test_util";

class Container {
    constructor() {
        this.agents = {};
        this.world0 = null;
        this.world = null;
        this.actions = [];
    }

    setup(parameter) {
        this.world0 = parameter.world.clone();
        this.world = parameter.world.clone();
        this.solution = parameter.solution;
        this.update = parameter.update;
        this.problemCallback = parameter.callback;
    }

    register(agent) {
        if (this.agents[agent.getID()]) {
            throw 'AgentIDAlreadyExists';
        } else {
            this.agents[agent.getID()] = agent;
        }
    }

    unregister(input) {
        let id = "";
        if (typeof input == 'string') {
            id = this.agents[input];
        } else if (typeof agent == 'Agent') {
            id = this.agents[input.getID()];
        } else {
            throw 'InvalidAgentType';
        }
        let agent = this.agents[id];
        agent.stop();
        delete agent;
    }

    start(callback) {
        this.callback = callback;
        this.loop();
    }

    loop() {
        //Creates a thread for every single agent
        this.agents.forEach(agent => {
            if (this.solution(this.world)) {
                agent.receive(currentWorld());
                let action = agent.send();
                this.actions.push({agentID: agent.getID(), action});
                this.world = this.update(this.world, action, agent.getID());
                if (this.solution(this.world)) {
                    finishAll()();
                } else {
                    loop();
                }
            }
        });
    }

    finishAll() {
        // Stop all the agents
        this.agents.forEach(agent => {
            agent.stop();
        });
        //Execute the callback
        this.callback({actions: actions(), world: currentWorld()});
    }

    get currentWorld() {
        return this.world.clone();
    }

    get actions() {
        return JSON.parse(JSON.stringify(this.actions));
    }

    stop() {

    }
}