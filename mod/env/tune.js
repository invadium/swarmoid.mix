const tune = {

    baseSeparation: .65,

    collective: {
        gatheringSpeed: 1,
    },

    tree: {
        line:       .3,
        startLen:    100,

        baseJuice:   4,
        minDeposit:  7,

        gatheringHeight: 0.35, // gathering point in tree height
    },

    fruit: {
        maxWeight:    40,
        sproutWeight: 40,
    },

    hive: {
        maxHP: 10000,

        nestingRadius: 50,
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
