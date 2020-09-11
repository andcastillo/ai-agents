const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);

        this.costs = {
            "R": 1,
            "L": 1,
            "A": 3
        }
    }



    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        return this.table[this.perception.join(",")]
    }

}

module.exports = CleanerAgent;