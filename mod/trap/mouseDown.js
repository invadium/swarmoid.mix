function mouseDown(e) {

    let last
    const ls = []
    switch(e.button) {
        case 0:
            last = lab.port.pick(e.x, e.y, ls)

            if (last) {
                console.dir(last)
                const flockmates = last.findLocalFlockmates()
                const closest = last.findClosestFlockmate()

                const hue = rnd()
                const color = hsl(hue, .5, .5)
                const selectedColor = hsl(hue, .7, .6)

                if (env.selectedBoid) env.selectedBoid.selected = false
                env.selectedBoid = last
                last.selected = true
                last.selectedFlockmates = flockmates
                last.color = selectedColor
                flockmates.forEach(boid => boid.color = color)

                closest.color = '#ff0000'
            } else {
                const wx = lab.port.lx(e.x),
                      wy = lab.port.ly(e.y)

                lab.port.swarmA.setTarget(wx, wy)
            }
            break

        case 1:
            lab.port.swarmA.spawn()
            break

        case 2:
            last = lab.port.pick(e.x, e.y, ls)
            if (last) last.switchMood()
            break
    }
}
