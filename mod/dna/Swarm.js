let id = 0

class Swarm {

    constructor(st) {
        extend(this, {
            name: 'swarm' + (++id),
            _ls:  [],

            x:    0,
            y:    0,

            stats: {
                acceleration: 10,
                deceleration: 10,
                turnSpeed:    HALF_PI,
                flockingDist: 100,
            },
        }, st)
    }

    spawn() {
        const dir = TAU * rnd()
        this._ls.push( new dna.Boid({
            __:    this,
            id:    this._ls.length + 1,
            stats: this.stats,

            dir:   dir,
            tdir:  dir,
            timer: 1 + rnd(),
        }) )
    }

    evo(dt) {
        const ls = this._ls,
              N  = ls.length

        for (let i = 0; i < N; i++) {
            const boid = ls[i]
            if (!boid.dead) boid.evo(dt)
        }
    }

    draw() {
        const ls = this._ls,
              N  = ls.length


        for (let i = 0; i < N; i++) {
            const b = ls[i],
                  r = b.r
            fill(b.color)
            triangle(
                b.x + cos(b.dir) * r, b.y + sin(b.dir) * r,
                b.x - cos(b.dir-.5) * r, b.y - sin(b.dir-.5) * r,
                b.x - cos(b.dir+.5) * r, b.y - sin(b.dir+.5) * r,
            )

            if (b.selected) {
                lineWidth(1)
                stroke(hsl(.2, .5, .5))
                circle(b.x, b.y, b.stats.flockingDist)
            }
        }
    }

    pick(x, y, ls) {
        let last

        for (let i = this._ls.length - 1; i >= 0; i--) {
            const picked = this._ls[i].pick(x, y, ls)
            if (picked) last = picked
        }

        return last
    }
}
