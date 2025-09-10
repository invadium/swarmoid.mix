class Collective {

    constructor(st) {
        augment(this, {}, st)
    }

    spawn() {
        this.hive.spawn()
    }

    dispatch(x, y) {
        const target = { x, y }

        const gatheringPack = this.hive.findGatheringBoids()

        if (gatheringPack.length > 0) {
            gatheringPack.forEach( boid => boid.setTarget(target) )
            this.lastPack = gatheringPack
        } else if (this.lastPack) {
            this.lastPack.forEach( boid => boid.setTarget(target) )
        }
    }

    rushTo(x, y) {
        const target = { x, y }

        const pack = this.hive.findBoids( boid => true )
        pack.forEach( boid => boid.setTarget(target) )

        this.lastPack = gatheringPack
    }

    nest() {
        const foragingPack = this.hive.findForagingBoids(),
              nestingPoint = this.hive.nestingPoint
        foragingPack.forEach( boid => boid.setTarget(nestingPoint) )
    }

    gatherUp(share) {
        const nestingPack    = this.hive.findNestingBoids(),
              gatheringPoint = this.hive.gatheringPoint,
              toGather       = floor(nestingPack.length * share)

        for (let i = 0; i < toGather; i++) {
            nestingPack[i].setTarget(gatheringPoint)
        }
    }

    gatherOneUp() {
        const nestingPack    = this.hive.findNestingBoids(),
              gatheringPoint = this.hive.gatheringPoint
        if (nestingPack.length === 0) return

        const boid = math.rnde(nestingPack)
        boid.setTarget( gatheringPoint )
    }

    ungatherOneDown() {
        const gatheringPack = this.hive.findGatheringBoids(),
              nestingPoint  = this.hive.nestingPoint
        if (gatheringPack.length === 0) return

        const boid = math.rnde(gatheringPack)
        boid.setTarget( nestingPoint )
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
