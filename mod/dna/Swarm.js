let id = 0

class Swarm {

    constructor(st) {
        extend(this, {
            name: 'swarm' + (++id),

            _ls:  [],

            color: '#0080ff',
            spawnPoint: {
                x:    0,
                y:    0,
            },

            stats: {
                acceleration:   25,
                deceleration:   25,
                maxSpeed:       75,
                turnSpeed:      HALF_PI,
                flockingDist:   150,
                separationDist: 15,
                cohesionDist:   75,
            },
        }, st)

        this.setTarget(
            this.spawnPoint.x,
            this.spawnPoint.y
        )
    }

    setTarget(x, y) {
        this.target = { x, y }
    }

    spawn() {
        const dir = TAU * rnd()
        this._ls.push( new dna.Boid({
            __:    this,
            id:    this._ls.length + 1,
            stats: this.stats,

            x:     this.spawnPoint.x,
            y:     this.spawnPoint.y,
            dir:   dir,
            tdir:  dir,
            timer: 1 + rnd(),
            color: this.color,
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
                }

                /*
                const step = 3
                let sh = step
                for (let j = 0; j < b.currentAction; j++) {
                    const r2 = r + sh
                    line(
                        b.x - cos(b.dir-.5) * r2,
                        b.y - sin(b.dir-.5) * r2,
                        b.x - cos(b.dir+.5) * r2,
                        b.y - sin(b.dir+.5) * r2
                    )

                    sh += step
                }
                */
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

        if (env.debug && env.debugSwarm) {
            lineWidth(2)
            stroke(this.color)
            circle(this.spawnPoint.x, this.spawnPoint.y, 5)
            circle(this.spawnPoint.x, this.spawnPoint.y, 10)
            circle(this.spawnPoint.x, this.spawnPoint.y, 15)

            if (this.target) {
                // show the target
                fill(this.color)
                circle(this.target.x, this.target.y, 2)
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
