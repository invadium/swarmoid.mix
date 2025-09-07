const STEPS       = 8

const BASE_LEN    = .62
const VAR_LEN     = .25

const BASE_SPREAD = .35
const VAR_SPREAD  = .25

const BASE_WIDTH   = 20
const WIDTH_FACTOR = .75

const MIN_FRUIT    = 1

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
            fruits:   [],
            exohoney: 0,
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

        if (branch.x2 < this.lowX) this.lowX = branch.x2
        if (branch.x2 > this.topX) this.topX = branch.x2
        if (branch.y2 < this.topY) this.topY = branch.y2
        if (branch.y2 > this.lowY) this.lowY = branch.y2

        if (steps > 0) {
            steps --
            branch.left  = this.branchOut(branch, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps)
            branch.right = this.branchOut(branch,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps)
        }

        return branch
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
        this.root = root
        this.branches.push(root)
        this.lowY = root.y1
        this.topY = root.y2
        this.lowX = root.x1
        this.topX = root.x1

        root.left  = this.branchOut(root, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps)
        root.right = this.branchOut(root,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps)

        const margin = 40
        this.w = (this.topX - this.lowX) + margin
        this.h = (this.lowY - this.topY) + margin
        this.x = this.lowX + .5 * this.w - .5 * margin
        this.y = this.topY + .5 * this.h - .5 * margin
        this.x1 = this.x - .5 * this.w
        this.y1 = this.y - .5 * this.h
        this.x2 = this.x + this.w
        this.y2 = this.y + this.h
    }

    collide(hitter) {
        if (hitter.isFull()
            || hitter.x < this.x1
            || hitter.x > this.x2
            || hitter.y < this.y1
            || hitter.y > this.y2) return // the hitter is full or outside the tree bounds

        const ls = this.fruits
        for (let i = ls.length - 1; i >= 0; i--) {
            const fruit = ls[i]
            if (fruit.cr < MIN_FRUIT) continue

            const dx = abs(fruit.x - hitter.x),
                  dy = abs(fruit.y - hitter.y)
            
            if (dx < fruit.cr && dy < fruit.cr) {
                const honeyLeftover = hitter.collect( fruit.extract() )
                if (honeyLeftover > 0) fruit.deposit(honeyLeftover) // redeposit leftovers
            }
        }
    }

    selectRandomTopBranch(base) {
        if (base.left && base.right) {
            const nextBase = (rnd() < .5)? base.left : base.right
            return this.selectRandomTopBranch(nextBase)
        }
        return base
    }

    deposit(exohoney) {
        const topBranch = this.selectRandomTopBranch(this.root)
        if (!topBranch.fruit) {
            topBranch.fruit = new dna.Fruit({
                x: topBranch.x2,
                y: topBranch.y2,
            })
            this.fruits.push(topBranch.fruit)
        }
        topBranch.fruit.deposit(exohoney)
    }

    evo(dt) {
        this.exohoney += env.tune.tree.output * dt
        if (this.exohoney > env.tune.tree.minDeposit) {
            this.deposit(this.exohoney)
            this.exohoney = 0
        }
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

        lineWidth(2)
        stroke(env.style.color.fruit)
        for (let i = 0; i < this.fruits.length; i++) {
            const f = this.fruits[i]
            if (f.r >= MIN_FRUIT) {
                circle(f.x, f.y, f.r)
            }
        }
        restore()

        if (env.debug && env.debugContact) {
            lineWidth(1)
            stroke('#ffff00')
            rect(this.x - .5 * this.w, this.y - .5 * this.h, this.w, this.h)
        }
    }

}
