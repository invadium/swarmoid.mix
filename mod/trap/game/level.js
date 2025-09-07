function level(st) {
    
    // plant the exotrees
    const hShift = .5 * rx(env.tune.baseSeparation) // TODO should not be screen-dependent!!!
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


    // create the swarm
    const swarm = lab.port.spawn( dna.Swarm, {
        Z:      701,
        name:  'swarm',
    })
    pin.link(swarm)


    // create collectives
    const omegaCollective = lab.overlord.spawn( dna.Collective, {
        id:    1,
        name: 'omegaCollective',
        swarm: swarm,
    })
    const sigmaCollective = lab.overlord.spawn( dna.Collective, {
        id:    2,
        name: 'sigmaCollective',
        swarm: swarm,
    })
    lab.overlord.team = [
        null,
        omegaCollective,
        sigmaCollective,
    ]


    // create the hives
    lab.port.spawn( dna.Hive, {
        Z:      201,
        name:  'omegaHive',
        team:   1,
        color: '#0080ff',
        swarm:  swarm,
        tree:   leftTree,
        mount:  'right',

        collective: omegaCollective,

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })
    omegaCollective.hive = lab.port.omegaHive

    lab.port.spawn( dna.Hive, {
        Z:      202,
        name:  'sigmaHive',
        team:   2,
        color: '#ff8000',
        swarm:  swarm,
        tree:   rightTree,
        mount:  'left',

        collective: sigmaCollective,

        init: function() {
            for (let i = 0; i < 32; i++) {
                this.spawn()
            }
        },
    })
    sigmaCollective.hive = lab.port.sigmaHive

    env.mouse.collective = omegaCollective
}
