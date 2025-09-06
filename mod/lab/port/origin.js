const hidden = true

function cross(x, y, w, c) {
    stroke(c)
    lineWidth(1)
    line(x-w,  y,   x+w, y  )
    line(  x,  y-w, x,   y+w)
}

function draw() {
    const c = '#ffa020'

    cross(0, 0, 25, c)

    const edge = 200
    cross(-edge, -edge, 15, c)
    cross(-edge,  edge, 15, c)
    cross( edge, -edge, 15, c)
    cross( edge,  edge, 15, c)
}
