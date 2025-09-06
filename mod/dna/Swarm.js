let id = 0

class Boid {

    constructor(st) {
        extend(this, {
            x:     0,
            y:     0,
            dir:   0,
            speed: 40,

            timer: 0,

            size: 10,
        }, st)
    }

    locateLocalFlockmates() {
        const flockmates = [],
              __ = this.__
              ls = __._ls

        for (let i = ls.length - 1; i >= 0; i--) {
            const boid = ls[i]
            if (distance(this.x, this.y, boid.x, boid.y) < __.flockingDist) {
                flockmates.push(boid)
            }
        }
    }

    evo(dt) {
        this.x += cos(this.dir) * this.speed * dt
        this.y += sin(this.dir) * this.speed * dt

        // brownian motion
        this.timer -= dt
        if (this.timer < 0) {
            this.dir = rnd() * TAU
            this.timer = 1 + rnd(3)
        }
    }
}

class Swarm {

    constructor(st) {
        extend(this, {
            name: 'swarm' + (++id),
            _ls:  [],

            x:    0,
            y:    0,

            flockingDist: 100,
        }, st)

        this.spawn()
    }

    spawn() {
        this._ls.push( new Boid({
            __: this,
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

        fill('#0080ff')

        for (let i = 0; i < N; i++) {
            const b = ls[i],
                  size = b.size
            triangle(
                b.x + cos(b.dir) * size, b.y + sin(b.dir) * size,
                b.x - cos(b.dir-.5) * size, b.y - sin(b.dir-.5) * size,
                b.x - cos(b.dir+.5) * size, b.y - sin(b.dir+.5) * size,
            )
        }
    }

}
