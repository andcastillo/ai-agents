const tf = require('@tensorflow/tfjs-node');

class Agent {
    constructor(name) {
        this.id = name;
        if (!name) {
            this.id = Math.round(Math.random() * 10e8);
        }
        this.state = null;
        this.perception = null
        this.table = {"default": 0};
    };

    setup(parameters = { actions: [] }) {
        this.table = parameters.table;
    }

    receive(inputs) {
        this.perception = inputs;
    }
    /**
     * Inform to the Agent Container about the action to perform
     */
    send() {
        return table["deafult"];
    }

    getLocalName() {
        return this.id;
    }

    getID() {
        return this.id;
    }

    /**
     * Do whatever you do when the agent is stoped. Close connections to databases, write files etc.
     */
    stop() {
    }
}

module.exports = Agent;