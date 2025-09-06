// moods
const NONE     = 0,
      BROWNIAN = 1,
      FLOCK    = 2


class Boid {

    constructor(st) {
        extend(this, {
            x:     0,
            y:     0,
            r:     15,
            dir:   0,
            tdir:  0,
            speed: 25,
            color: '#0080ff',

            mood:  BROWNIAN,

            timer: 0,

            dead:  false,
        }, st)
    }

    findClosestFlockmate(predicate) {
        const ls = this.__._ls

        let closest,
            closestDist = Number.MAX_SAFE_INTEGER
        for (let i = ls.length - 1; i >= 0; i--) {
            const boid = ls[i]
            if (boid !== this) {
                const d = distance(this.x, this.y, boid.x, boid.y)
                if (d < closestDist) {
                    if (isFun(predicate)) {
                        if (predicate(boid)) {
                            closest = boid
                            closestDist = d
                        }
                    } else {
                        closest = boid
                        closestDist = d
                    }
                }
            }
        }

        return closest
    }

    locateLocalFlockmates(predicate) {
        const flockmates = [],
              ls = this.__._ls

        for (let i = ls.length - 1; i >= 0; i--) {
            const boid = ls[i]
            if (boid !== this && distance(this.x, this.y, boid.x, boid.y) < this.stats.flockingDist) {
                if (isFun(predicate)) {
                    if (predicate(boid)) flockmate.push(boid)
                } else {
                    flockmates.push(boid)
                }
            }
        }

        return flockmates
    }

    evo(dt) {
        // move
        this.x += cos(this.dir) * this.speed * dt
        this.y += sin(this.dir) * this.speed * dt

        // steer
        if (this.dir !== this.tdir) {
            if (this.dir < this.tdir) {
                this.dir = min(this.dir + this.stats.turnSpeed * dt, this.tdir)
            } else if (this.dir > this.tdir) {
                this.dir = max(this.dir - this.stats.turnSpeed * dt, this.tdir)
            }
        }

        switch(this.mood) {
            case NONE:
                break

            case BROWNIAN:
                // brownian motion
                this.timer -= dt
                if (this.timer < 0) {
                    this.tdir  = rnd() * TAU
                    this.timer = 1 + rnd(3)
                }
            break
        }
    }

    pick(x, y, ls) {
        if (distance(this.x, this.y, x, y) <= this.r) {
            ls.push(this)
            return this
        }
    }
}
