let id = 0

class Swarm {

    constructor(st) {
        extend(this, {
            name: 'swarm' + (++id),

            _ls:  [],

        }, st)
    }

    attach(boid) {
        boid.__ = this
        boid.id = this._ls.length + 1
        this._ls.push( boid )
    }

    // apply a function to boids
    // 
    // predicate is optional, could be a team number or a function
    apply(fn, predicate) {
        if (isNum(predicate)) {
            for (let i = this._ls.length - 1; i >= 0; i--) {
                const boid = this._ls[i]
                if (boid.team === predicate) fn(boid)
            }
        } else if (isFun(predicate)) {
            for (let i = this._ls.length - 1; i >= 0; i--) {
                const boid = this._ls[i]
                if (predicate(boid)) fn(boid)
            }
        } else {
            for (let i = this._ls.length - 1; i >= 0; i--) {
                fn(this._ls[i])
            }
        }
    }

    collide(hitter) {
        const ls = this._ls

        for (let i = ls.length - 1; i >= 0; i--) {
            const target = ls[i]

            if (!target.dead && target !== hitter && target.team !== hitter.team
                    && math.distanceSq(hitter.x, hitter.y, target.x, target.y) < hitter.cr2 + target.cr2) {
                hitter.dead = true
                target.dead = true
            }
        }
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
            if (b.dead) continue

            fill(b.color)
            triangle(
                b.x + cos(b.dir) * r, b.y + sin(b.dir) * r,
                b.x - cos(b.dir-.5) * r, b.y - sin(b.dir-.5) * r,
                b.x - cos(b.dir+.5) * r, b.y - sin(b.dir+.5) * r,
            )

            if (env.debug) {
                stroke(b.color)
                lineWidth(1)

                if (env.debugContact) {
                    circle(b.x, b.y, b.cr)
                }

                if (env.debugActions) {
                    let ac = '#ffffff'
                    switch(b.currentAction) {
                        case 0: ac = '#808080'; break;
                        case 1: ac = '#ff0000'; break;
                        case 2: ac = '#ff9000'; break;
                        case 3: ac = '#00ffff'; break;
                        case 4: ac = '#00ff00'; break;
                    }

                    stroke(ac)
                    lineWidth(2)
                    triangle(
                        b.x + cos(b.dir) * r, b.y + sin(b.dir) * r,
                        b.x - cos(b.dir-.5) * r, b.y - sin(b.dir-.5) * r,
                        b.x - cos(b.dir+.5) * r, b.y - sin(b.dir+.5) * r,
                    )
                } else if (env.debugHarvest) {

                    let c
                    if (b.isFull()) c = '#ff9040'
                    else if (b.isLoaded()) c = '#804000'

                    if (c) {
                        stroke(c)
                        lineWidth(2)
                        triangle(
                            b.x + cos(b.dir) * r, b.y + sin(b.dir) * r,
                            b.x - cos(b.dir-.5) * r, b.y - sin(b.dir-.5) * r,
                            b.x - cos(b.dir+.5) * r, b.y - sin(b.dir+.5) * r,
                        )
                    }
                }
            }

            if (env.debug && b.selected) {
                lineWidth(1)
                stroke(hsl(.2, .5, .5))
                circle(b.x, b.y, b.stats.flockingDist)

                const mates = b.selectedFlockmates
                fill('#ff9000')
                circle(mates.avgX, mates.avgY, 2)

                stroke('#ff9000')
                line(
                    mates.avgX,
                    mates.avgY,
                    mates.avgX + cos(mates.avgDir) * 10,
                    mates.avgY + sin(mates.avgDir) * 10
                )
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
