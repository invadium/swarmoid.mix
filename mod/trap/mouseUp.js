function mouseUp(e) {

    switch(e.button) {
        case 0:
            // === left button ===
            if (!env.mouse.collective) return

            const wx = lab.port.lx(e.x),
                  wy = lab.port.ly(e.y)
            env.mouse.collective.dispatch(wx, wy)

            break
    }

}
