let id = 0
class Hive {

    constructor(st) {
        extend(this, {
            name: 'hive' + (++id),
            team: 0,

            x:  0,
            y:  0,
            cr: 15,

            segments: [],

            stats: extend({}, env.tune.boid)

        }, st)

        switch(this.mount) {
            case 'left':
                this.branch = this.tree.root.left.left
                break
            case 'right':
                this.branch = this.tree.root.right.right
                break
        }
        this.x = this.branch.x2
        this.y = this.branch.y2

        this.gatheringPoint = {
            x: this.tree.source.x,
            y: this.tree.topY - this.tree.h * env.tune.tree.gatheringHeight
        }

        this.grow({
            x:   0,
            y:   0,
            r:   2,

            phi: 0,
            R:   0,

            phiStep: .3,
            phiVar:  .1,
            rStep:    0.1,
            RStep:    0.6,

            rFac:    1.007,
            phiFac:  1.02,
            RFac:    1.01,

            steps: 35,
        })

    }

    grow(st) {
        const x = cos(st.phi) * st.R,
              y = sin(st.phi) * st.R

        this.segments.push({
            x: x,
            y: y,
            r: st.r,
        })

        if (st.steps > 0) {
            const next = {
                x:   x,
                y:   y,
                r:   st.r + st.rStep,

                phi: st.phi + st.phiStep + st.phiVar * rnd(),
                R:   st.R   + st.RStep,

                phiStep: st.phiStep * st.phiFac,
                phiVar:  st.phiVar  * st.phiFac,
                RStep:   st.RStep   * st.RFac,
                rStep:   st.rStep   * st.rFac,

                phiFac: st.phiFac,
                RFac:   st.RFac,
                rFac:   st.rFac,

                steps:  st.steps - 1,
            }
            this.grow(next)
        }
    }

    setTarget(target) {
        this.target = target

        this.swarm.apply(boid => boid.setTarget(target), this.team)
    }

    // spawn new boid for this hive
    spawn() {
        const dir = TAU * rnd()
        const newBoid = new dna.Boid({
            team:  this.team,
            stats: this.stats,

            x:     this.x,
            y:     this.y,
            dir:   dir,
            tdir:  dir,
            timer: 1 + rnd(),
            color: this.color,
        })
        this.swarm.attach( newBoid )
        newBoid.setTarget(this.gatheringPoint)
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill(this.color)

        for (let i = 0; i < this.segments.length; i++) {
            const seg = this.segments[i]
            circle(seg.x, seg.y, seg.r)
        }

        if (env.debug && env.debugContact) {
            lineWidth(1)
            stroke('#ffff00')
            circle(0, 0, this.cr)
        }

        restore()

        if (env.debug && env.debugHive) {
            lineWidth(2)
            stroke(this.color)
            circle(this.gatheringPoint.x, this.gatheringPoint.y, 4)

            if (this.target) {
                fill(this.color)
                circle(this.target.x, this.target.y, 2)
            }
        }
    }

}
