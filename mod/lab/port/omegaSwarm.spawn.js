const omegaSwarm = {
    DNA: 'Swarm',
    Z:    201,

    color: '#0080ff',

    spawnPoint: {
        x: -250,
        y:  0,
    },

    init: function() {
        for (let i = 0; i < 32; i++) {
            this.spawn()
        }
    }
}
