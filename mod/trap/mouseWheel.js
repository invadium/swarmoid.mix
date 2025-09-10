function mouseWheel(e) {
    const collective = env.mouse.collective
    if (!collective) return

    if (e.wheelDeltaY > 0) {
        collective.gatherOneUp()
    } else if (e.wheelDeltaY < 0) {
        collective.ungatherOneDown()
    }
}
