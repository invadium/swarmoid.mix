class Fruit {

    constructor(st) {
        extend(this, {
            x:        0,
            y:        0,
            r:        1,
            cr:       1,
            exohoney: 0,
            extra:    0,
        }, st)
    }

    adjust() {
        this.r = this.cr = floor(this.exohoney / 10)
    }

    sprout() {
        this.exohoney = 0
        this.extra = 0
        this.adjust()

        this.tree.sprout(this.__, 1)
        this.tree.adjust()
    }

    deposit(exohoney) {
        if (this.exohoney === env.tune.fruit.maxWeight) {
            this.extra += exohoney
            if (this.extra >= env.tune.fruit.sproutWeight) this.sprout()
        } else {
            this.exohoney = min(this.exohoney + exohoney, env.tune.fruit.maxWeight)
            this.adjust()
        }
    }

    extract() {
        const exohoney = this.exohoney
        this.exohoney = 0
        this.extra = 0
        this.adjust()
        
        return exohoney
    }

}
