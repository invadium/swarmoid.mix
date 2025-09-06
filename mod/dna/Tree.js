const STEPS       = 8

const BASE_LEN    = .62
const VAR_LEN     = .25

const BASE_SPREAD = .35
const VAR_SPREAD  = .25

const BASE_WIDTH   = 20
const WIDTH_FACTOR = .75

let id = 0
class Tree {

    constructor(st) {
        extend(this, {
            name:  'tree' + (++id),
            color: '#604020',

            source: {
                x: 0,
                y: 0,
            },
            branches: [],
        }, st)

        this.grow(STEPS)
    }

    branchOut(anchor, incl, steps) {
        const dir = anchor.dir + incl
        const len = anchor.len * (BASE_LEN + VAR_LEN * rnd())

        const branch = {
            dir: dir,
            len: len,
            x1:  anchor.x2,
            y1:  anchor.y2,
            x2:  anchor.x2 + cos(dir) * len,
            y2:  anchor.y2 + sin(dir) * len,
            width: anchor.width * WIDTH_FACTOR,
        }
        this.branches.push(branch)

        if (steps > 0) {
            steps --
            this.branchOut(branch, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps)
            this.branchOut(branch,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps)
        }
    }

    grow(steps) {
        // grow from the source
        const dir = -HALF_PI
        const len = env.tune.tree.startLen

        const root = {
            dir: dir,
            len: len,
            x1:  this.source.x,
            y1:  this.source.y,
            x2:  this.source.x + cos(dir) * len,
            y2:  this.source.y + sin(dir) * len,
            width: BASE_WIDTH,
        }
        this.branches.push(root)

        this.branchOut(root, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps)
        this.branchOut(root,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps)
    }

    evo(dt) {
    }

    draw() {
        save()
        ctx.lineCap = 'round'
        for (let i = 0; i < this.branches.length; i++) {
            const b = this.branches[i]

            stroke(this.color)
            lineWidth(b.width)
            line(b.x1, b.y1, b.x2, b.y2)
        }
        restore()
    }

}
