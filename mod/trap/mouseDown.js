function mouseDown(e) {

    let last
    const ls = []
    switch(e.button) {
        case 0:
            // === left button ===

            if (!env.mouse.collective) return

            if (e.ctrlKey || e.shiftKey) {
                const wx = lab.port.lx(e.x),
                      wy = lab.port.ly(e.y)

                env.mouse.collective.rushTo(wx, wy)
            } else {
                env.mouse.collective.gatherUp()
            }

            /*
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
            */
            break

        case 1:
            // === middle button ===
            if (e.ctrlKey || e.shiftKey) {
                // spawn action
                if (!env.mouse.collective) return
                env.mouse.collective.spawn()
            } else {
                // switch team action
                let next = lab.overlord.team[ 1 ]

                if (env.mouse.collective) {
                    next = lab.overlord.team[ env.mouse.collective.id + 1 ]
                    if (!next) next = lab.overlord.team[ 1 ]
                }
                env.mouse.collective = next
            }
            break

        case 2:
            // === right button ===
            // TODO go nesting?
    }
}
