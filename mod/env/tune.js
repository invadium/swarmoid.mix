const tune = {

    baseSeparation: .65,

    tree: {
        line:       .3,
        startLen:    100,

        output:      40,
        minDeposit:  10,

        gatheringHeight: 0.35, // gathering point in tree height
    },

    hive: {
        maxHP: 10000,

        nestingFactor: 10,
        spawnBiomass:  100,
    },

    boid: {
        baseRadius: 10,
        baseContactRadius: 7,

        acceleration:   75,
        deceleration:   75,
        maxSpeed:       150,
        turnSpeed:      TAU,
        flockingDist:   150,
        separationDist: 15,
        cohesionDist:   75,

        maxHP:          100,
        maxHarvest:     100,
    },

}
