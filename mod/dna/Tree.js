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

        this.grow(7)
    }

    branchOut(anchor, incl, steps) {
        const dir = anchor.dir + incl
        const len = anchor.len * (.6 + .3 * rnd())

        const branch = {
            dir: dir,
            len: len,
            x1:  anchor.x2,
            y1:  anchor.y2,
            x2:  anchor.x2 + cos(dir) * len,
            y2:  anchor.y2 + sin(dir) * len,
            width: steps * 1.75,
        }
        this.branches.push(branch)

        if (steps > 0) {
            steps --
            this.branchOut(branch, -.4, steps)
            this.branchOut(branch,  .4, steps)
        }
    }

    grow(steps) {
        // grow from the source
        const dir = -HALF_PI
        const len = 100

        const root = {
            dir: dir,
            len: len,
            x1:  this.source.x,
            y1:  this.source.y,
            x2:  this.source.x + cos(dir) * len,
            y2:  this.source.y + sin(dir) * len,
            width: steps * 2.75,
        }
        this.branches.push(root)

        this.branchOut(root, -.4, steps)
        this.branchOut(root,  .4, steps)
    }

    evo(dt) {
    }

    draw() {
        for (let i = 0; i < this.branches.length; i++) {
            const b = this.branches[i]

            stroke(this.color)
            lineWidth(b.width)
            line(b.x1, b.y1, b.x2, b.y2)
        }
    }

}
