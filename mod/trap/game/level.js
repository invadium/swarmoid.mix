function level(st) {
    const hShift = .5 * rx(env.tune.baseSeparation)
    const treeBaseY = ry(env.tune.tree.line)
    
    lab.port.spawn( dna.Tree, {
        Z: 101,

        source: {
            x: -hShift,
            y:  treeBaseY,
        },
    })

    lab.port.spawn( dna.Tree, {
        Z: 102,
        source: {
            x:  hShift,
            y:  treeBaseY,
        },
    })


    // create swarms
    const swarmBaseY = treeBaseY - env.tune.tree.startLen * env.tune.tree.hivePoint

    lab.port.spawn( dna.Swarm, {
        Z:      201,
        name:  'omegaSwarm',
        color: '#0080ff',

        spawnPoint: {
            x: -hShift,
            y:  swarmBaseY,
        },

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })

    lab.port.spawn( dna.Swarm, {
        Z:      202,
        name:  'sigmaSwarm',
        color: '#ff8000',

        spawnPoint: {
            x:  hShift,
            y:  swarmBaseY,
        },

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        }
    })

}
