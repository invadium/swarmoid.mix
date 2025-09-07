class Collective {

    constructor(st) {
        augment(this, {}, st)
    }

    spawn() {
        this.hive.spawn()
    }

    gatherUp() {
        this.gathering = true
        this.timer = 0
    }

    dispatch(x, y) {
        if (!this.gathering) return
        const target = { x, y }

        const gatheringPack = this.hive.findGatheringBoids()
        gatheringPack.forEach( boid => boid.setTarget(target) )

        this.gathering = false
    }

    rushTo(x, y) {
        const target = { x, y },
              team = this.id
        this.swarm.apply(boid => boid.setTarget(target), boid => !boid.dead && boid.team === team)
    }

    selectRandomNestingBoid() {
        return math.rnde( this.hive.findNestingBoids() )
    }

    evo(dt) {
        if (this.gathering) {
            this.timer += dt
            if (this.timer >= env.tune.collective.gatheringSpeed) {
                const nestingBoid = this.selectRandomNestingBoid()
                if (nestingBoid) {
                    nestingBoid.setTarget( this.hive.gatheringPoint )
                }
                this.timer = 0
            }
        }
    }

}
