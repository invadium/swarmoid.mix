function mouseUp(e) {

    const collective = env.mouse.collective

    switch(e.button) {
        case 0:
            // === left button up ===
            if (!collective) return

            if (e.ctrlKey || e.shiftKey) {
                const wx = lab.port.lx(e.x),
                      wy = lab.port.ly(e.y)

                collective.rushTo(wx, wy)
            } else {
                const wx = lab.port.lx(e.x),
                      wy = lab.port.ly(e.y)
                collective.dispatch(wx, wy)
            }
            break

        case 1:
            // === middle button ===
            if (e.ctrlKey || e.shiftKey) {
                // spawn action
                if (!collective) return
                collective.spawn()

            } else {
                collective.gatherUp(.5)
            }

            break

    }

}
