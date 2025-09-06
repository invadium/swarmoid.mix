function mouseDown(e) {
    switch(e.button) {
        case 0:
            const ls = []
            const last = lab.port.pick(e.x, e.y, ls)

            if (last) {
                console.dir(last)
                const flockmates = last.locateLocalFlockmates()
                const closest = last.findClosestFlockmate()

                const hue = rnd()
                const color = hsl(hue, .5, .5)
                const selectedColor = hsl(hue, .7, .6)

                if (env.selectedBoid) env.selectedBoid.selected = false
                env.selectedBoid = last
                last.selected = true
                last.color = selectedColor
                flockmates.forEach(boid => boid.color = color)

                closest.color = '#ff0000'
            }
            break

        case 2:
            lab.port.swarmA.spawn()
            break
    }
}
