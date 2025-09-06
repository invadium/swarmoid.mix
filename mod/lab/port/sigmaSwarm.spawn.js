const sigmaSwarm = {
    DNA: 'Swarm',

    color: '#ff8000',

    spawnPoint: {
        x:  250,
        y:  0,
    },

    init: function() {
        for (let i = 0; i < 32; i++) {
            this.spawn()
        }
    }
}
