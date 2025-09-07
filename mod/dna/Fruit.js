class Fruit {

    constructor(st) {
        augment(this, {
            x:        0,
            y:        0,
            r:        1,
            cr:       1,
            exohoney: 0,
        }, st)
    }

    adjust() {
        this.r = this.cr = floor(this.exohoney / 10)
    }

    deposit(exohoney) {
        this.exohoney = min(this.exohoney + exohoney, 40)
        this.adjust()
    }

    extract() {
        const exohoney = this.exohoney
        this.exohoney = 0
        this.adjust()
        
        return exohoney
    }
}
