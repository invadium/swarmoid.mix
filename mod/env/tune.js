const tune = {

    baseSeparation: .65,

    tree: {
        line:       .3,
        startLen:    100,

        output:      20,
        minDeposit:  1,
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
    },

}
