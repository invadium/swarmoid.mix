class Fruit {

    constructor(st) {
        augment(this, {
            x:        0,
            y:        0,
            r:        1,
            cr:       1,
            exohoney: 0,

            dead:     false,
        }, st)
    }

    deposit(exohoney) {
        this.exohoney = min(this.exohoney + exohoney, 4)
        this.r = this.cr = this.exohoney
    }

    draw() {
        stroke(env.style.color.fruit)
    }
}
