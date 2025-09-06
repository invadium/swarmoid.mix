function mouseDown(e) {
    switch(e.button) {
        case 0:
            const ls = []
            const last = lab.port.pick(e.x, e.y, ls)

            if (last) {
                console.dir(last)
            }
            break

        case 2:
            lab.port.swarmA.spawn()
            break
    }
}
