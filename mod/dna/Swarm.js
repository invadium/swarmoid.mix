let id = 0

class Boid {

    constructor(st) {
        extend(this, {
            x:     0,
            y:     0,
            r:     10,
            dir:   0,
            speed: 40,

            timer: 0,
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

    pick(x, y, ls) {
        if (distance(this.x, this.y, x, y) <= this.r) {
            ls.push(this)
            return this
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
    }

    spawn() {
        this._ls.push( new Boid({
            __: this,
            id: this._ls.length + 1,
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
                  r = b.r
            triangle(
                b.x + cos(b.dir) * r, b.y + sin(b.dir) * r,
                b.x - cos(b.dir-.5) * r, b.y - sin(b.dir-.5) * r,
                b.x - cos(b.dir+.5) * r, b.y - sin(b.dir+.5) * r,
            )
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
