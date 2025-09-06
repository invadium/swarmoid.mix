
function evo(dt) {
    let last
    const ls = []

    last = lab.port.pick(mouse.x, mouse.y, ls)

    if (last) {
        lab.overlay.statusBar.message = last.getStatus()
    } else {
        lab.overlay.statusBar.message = ''
    }
}

