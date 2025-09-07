function level(st) {
    const hShift = .5 * rx(env.tune.baseSeparation)
    const treeBaseY = ry(env.tune.tree.line)
    
    const leftTree = lab.port.spawn( dna.Tree, {
        Z: 101,

        source: {
            x: -hShift,
            y:  treeBaseY,
        },
    })

    const rightTree = lab.port.spawn( dna.Tree, {
        Z: 102,

        source: {
            x:  hShift,
            y:  treeBaseY,
        },
    })

    // create swarm and hives 
    const swarm = lab.port.spawn( dna.Swarm, {
        Z:      701,
        name:  'swarm',
    })
    pin.link(swarm)

    lab.port.spawn( dna.Hive, {
        Z:      201,
        name:  'omegaHive',
        team:   1,
        color: '#0080ff',
        swarm:  swarm,
        tree:   leftTree,
        mount:  'right',

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })

    lab.port.spawn( dna.Hive, {
        Z:      202,
        name:  'sigmaHive',
        team:   2,
        color: '#ff8000',
        swarm:  swarm,
        tree:   rightTree,
        mount:  'left',

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })
}
