// moods
const NONE     = 0,
      BROWNIAN = 1,
      FLOCKING = 2

class Boid {

    constructor(st) {
        extend(this, {
            x:     0,
            y:     0,
            r:     15,
            dir:   0,
            tdir:  0,
            speed: 0,
            color: '#0080ff',

            mood:  FLOCKING,
            currentAction: 0,

            timer: 0,

            dead:  false,
        }, st)
    }

    switchMood() {
        this.mood ++
        if (this.mood > FLOCKING) this.mood = NONE
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
                    if (!isFun(predicate) || predicate(boid)) {
                        closest = boid
                        closestDist = d
                    }
                }
            }
        }

        return closest
    }

    findLocalFlockmates(predicate) {
        const flockmates = [],
              ls = this.__._ls

        let closest,
            closestDist = Number.MAX_SAFE_INTEGER,
            closestMate,
            closestMateDist = Number.MAX_SAFE_INTEGER,
            xAcc = this.x,
            yAcc = this.y,
            dirAcc = this.dir

        for (let i = ls.length - 1; i >= 0; i--) {
            const boid = ls[i]
            if (boid === this) continue

            const dist = distance(this.x, this.y, boid.x, boid.y)
            if (dist < this.stats.flockingDist) {
                if (!isFun(predicate) || predicate(boid)) {
                    flockmates.push(boid)
                    dirAcc += boid.dir
                    xAcc += boid.x
                    yAcc += boid.y

                    if (dist < closestMateDist) {
                        closest         = boid
                        closestDist     = dist
                        closestMate     = boid
                        closestMateDist = dist
                    }
                }
            } else {
                if (!isFun(predicate) || predicate(boid)) {
                    if (dist < closestDist) {
                        closest     = boid
                        closestDist = dist
                    }
                }
            }
        }

        flockmates.avgX   = xAcc / (flockmates.length + 1)
        flockmates.avgY   = yAcc / (flockmates.length + 1)
        flockmates.avgDir = math.normalizeAngle(dirAcc / (flockmates.length + 1))
        flockmates.closest         = closest
        flockmates.closestDist     = closestDist
        flockmates.closestMate     = closestMate
        flockmates.closestMateDist = closestMateDist

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
                this.speed = max(this.speed - this.stats.deceleration * dt, 0)
                break

            case BROWNIAN:
                // brownian motion
                this.timer -= dt
                if (this.timer < 0) {
                    this.tdir  = rnd() * TAU
                    this.timer = 1 + rnd(3)
                }

                this.speed = min(this.speed + this.stats.acceleration * dt, this.stats.maxSpeed)
                break

            case FLOCKING:
                const flockmates = this.findLocalFlockmates()

                if (flockmates.length > 0 && flockmates.closestDist < this.stats.separationDist) {
                    // separating
                    const base = this
                    let bearingAcc = 0
                    flockmates.forEach(boid => {
                        bearingAcc += bearing(base.x, base.y, boid.x, boid.y)
                    })

                    const avgBearing = bearingAcc / flockmates.length
                    const separationDir = math.normalizeAngle(avgBearing + PI)

                    this.tdir = separationDir
                    this.speed = min(this.speed + this.stats.acceleration * dt, this.stats.maxSpeed)

                    this.currentAction = 1

                } else if ( distance(this.x, this.y, flockmates.avgX, flockmates.avgY) > this.stats.cohesionDist) {
                    this.tdir = bearing(this.x, this.y, flockmates.avgX, flockmates.avgY)

                    this.currentAction = 2

                } else {
                    if (this.__.target) {
                        this.tdir = bearing(this.x, this.y, this.__.target.x, this.__.target.y)
                        this.currentAction = 3
                    } else {
                        // alignment
                        this.tdir = flockmates.avgDir
                        this.speed = min(this.speed + this.stats.acceleration * dt, this.stats.maxSpeed)
                        this.currentAction = 4
                    }
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

    getStatus() {
        return `[boid #${this.id}] ${round(this.x)}:${round(this.y)}`
    }
}
