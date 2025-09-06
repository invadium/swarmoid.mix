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


    // create hives and swarms

    const omegaBranch = leftTree.root.right.right
    lab.port.spawn( dna.Hive, {
        Z:      201,
        name:  'omegaHive',
        color: '#0080ff',

        x:      omegaBranch.x2,
        y:      omegaBranch.y2,
    })

    const sigmaBranch = rightTree.root.left.left
    lab.port.spawn( dna.Hive, {
        Z:      202,
        name:  'sigmaHive',
        color: '#ff8000',

        x:      sigmaBranch.x2,
        y:      sigmaBranch.y2,
    })

    lab.port.spawn( dna.Swarm, {
        Z:      701,
        name:  'omegaSwarm',
        color: '#0080ff',

        spawnPoint: {
            x: omegaBranch.x2,
            y: omegaBranch.y2,
        },

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })

    lab.port.spawn( dna.Swarm, {
        Z:      702,
        name:  'sigmaSwarm',
        color: '#ff8000',

        spawnPoint: {
            x: sigmaBranch.x2,
            y: sigmaBranch.y2,
        },

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        }
    })

}
