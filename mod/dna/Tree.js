const STEPS       =  5

const BASE_LEN    = .62
const VAR_LEN     = .25

const BASE_SPREAD = .35
const VAR_SPREAD  = .25

const ROOT_WIDTH   = 5
const WIDTH_GROW   = .3
const WIDTH_DOWN_FACTOR = 0.25

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
            juice:    1,
        }, st)

        this.plant(STEPS)
    }

    adjustBranch(branch) {
        if (branch.x2 < this.lowX) this.lowX = branch.x2
        if (branch.x2 > this.topX) this.topX = branch.x2
        if (branch.y2 < this.topY) this.topY = branch.y2
        if (branch.y2 > this.lowY) this.lowY = branch.y2

        if (branch.left) this.adjustBranch(branch.left)
        if (branch.right) this.adjustBranch(branch.right)
    }

    adjust() {
        this.lowY = this.root.y1
        this.topY = this.root.y2
        this.lowX = this.root.x1
        this.topX = this.root.x1
        this.adjustBranch(this.root)
        
        const margin = 40
        this.w = (this.topX - this.lowX) + margin
        this.h = (this.lowY - this.topY) + margin
        this.x = this.lowX + .5 * this.w - .5 * margin
        this.y = this.topY + .5 * this.h - .5 * margin
        this.x1 = this.x - .5 * this.w
        this.y1 = this.y - .5 * this.h
        this.x2 = this.x + this.w
        this.y2 = this.y + this.h

        this.juice = this.root.width * env.tune.tree.baseJuice
    }

    growWidth(downBranch, width) {
        if (!downBranch) return

        downBranch.width += width
        this.growWidth(downBranch.__, width * WIDTH_DOWN_FACTOR)
    }

    moveBranch(branch, dx, dy) {
        if (!branch) return

        branch.x1 += dx
        branch.y1 += dy
        branch.x2 += dx
        branch.y2 += dy

        if (branch.hive) branch.hive.adjust()
        if (branch.fruit) branch.fruit.move(dx, dy)

        if (branch.left ) this.moveBranch(branch.left,  dx, dy)
        if (branch.right) this.moveBranch(branch.right, dx, dy)
    }

    adjustLength(branch, shift) {
        if (!branch) return

        const newLen = branch.len + shift,
              nx2 = branch.x1 + cos(branch.dir) * newLen,
              ny2 = branch.y1 + sin(branch.dir) * newLen,
              //dx  = nx2 - branch.x2,
              //dy  = ny2 - branch.y2
              dx  = cos(branch.dir) * shift,
              dy  = sin(branch.dir) * shift

        // move the tip
        branch.x2 = nx2
        branch.y2 = ny2
        branch.len = newLen

        if (branch.hive) branch.hive.adjust()
        if (branch.fruit) branch.fruit.move(dx, dy)

        // move the children
        this.moveBranch(branch.left,  dx, dy)
        this.moveBranch(branch.right, dx, dy)
    }

    growLength(downBranch, shift) {
        if (!downBranch) return

        this.adjustLength(downBranch, shift)

        this.growLength(downBranch.__, shift * env.tune.tree.lengthFactor)
    }

    branchOut(anchor, incl, steps) {
        if (steps === 0) return

        const dir = anchor.dir + incl
        const len = anchor.len * (BASE_LEN + VAR_LEN * rnd())

        const branch = {
            __:  anchor,
            dir: dir,
            len: len,
            x1:  anchor.x2,
            y1:  anchor.y2,
            x2:  anchor.x2 + cos(dir) * len,
            y2:  anchor.y2 + sin(dir) * len,
            //width: anchor.width * WIDTH_FACTOR,
            width: 1,
        }
        this.branches.push(branch)

        this.sprout(branch, steps - 1)

        this.growWidth(branch.__, WIDTH_GROW)

        return branch
    }

    sprout(branch, steps) {
        if (!branch || branch.left || branch.right) return

        branch.left  = this.branchOut(branch, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps)
        branch.right = this.branchOut(branch,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps)
        this.growLength(branch, env.tune.tree.lengthShift)
    }

    plant(steps) {
        // grow from the source
        const dir = -HALF_PI
        const len = env.tune.tree.startLen

        const root = {
            __:  null,
            dir: dir,
            len: len,
            x1:  this.source.x,
            y1:  this.source.y,
            x2:  this.source.x + cos(dir) * len,
            y2:  this.source.y + sin(dir) * len,
            width: ROOT_WIDTH,
        }
        this.root = root
        this.branches.push(root)

        root.left  = this.branchOut(root, -(BASE_SPREAD + VAR_SPREAD * rnd()), steps - 1)
        root.right = this.branchOut(root,   BASE_SPREAD + VAR_SPREAD * rnd(),  steps - 1)

        this.adjust()
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
                tree: this,
                __:   topBranch,
                x:    topBranch.x2,
                y:    topBranch.y2,
            })
            this.fruits.push(topBranch.fruit)
        }
        topBranch.fruit.deposit(exohoney)
    }

    evo(dt) {
        this.exohoney += this.juice * dt
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
