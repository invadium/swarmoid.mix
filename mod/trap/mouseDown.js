function mouseDown(e) {

    let last
    const ls = []
    switch(e.button) {
        case 0:
            last = lab.port.pick(e.x, e.y, ls)

            if (last && last instanceof dna.Boid) {
                console.dir(last)

                const flockmates = last.findLocalFlockmates()
                const closest = last.findClosest()

                const hue = rnd()
                const color = hsl(hue, .5, .5)
                const selectedColor = hsl(hue, .7, .6)
                const closestColor  = hsl(hue, .8, .7)

                if (env.selectedBoid) env.selectedBoid.selected = false
                env.selectedBoid = last
                last.selected = true
                last.selectedFlockmates = flockmates
                last.color = selectedColor
                flockmates.forEach(boid => boid.color = color)

                closest.color = closestColor
            } else {
                if (last) {
                    console.dir(last)
                }

                const wx = lab.port.lx(e.x),
                      wy = lab.port.ly(e.y)

                lab.port.omegaHive.setTarget({
                    x: wx,
                    y: wy
                })
            }
            break

        case 1:
            lab.port.omegaHive.spawn()
            lab.port.sigmaHive.spawn()
            break

        case 2:
            const wx = lab.port.lx(e.x),
                  wy = lab.port.ly(e.y)

            lab.port.sigmaHive.setTarget({
                x: wx,
                y: wy
            })
            break
    }
}
