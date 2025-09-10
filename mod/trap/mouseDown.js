function mouseDown(e) {
    //let last
    //const ls = []
    const collective = env.mouse.collective

    switch(e.button) {
        case 0:
            // === left button ===
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
            break

        case 2:
            // === right button up ===
            if (e.ctrlKey || e.shiftKey) {
                // switch the mouse team
                let next = lab.overlord.team[ 1 ]

                if (env.mouse.collective) {
                    next = lab.overlord.team[ env.mouse.collective.id + 1 ]
                    if (!next) next = lab.overlord.team[ 1 ]
                }
                env.mouse.collective = next

            } else {
                if (!collective) return
                collective.nest()
            }
            break
    }
}
