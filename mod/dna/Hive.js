let id = 0
class Hive {

    constructor(st) {
        extend(this, {
            name: 'hive' + (++id),

            x:  0,
            y:  0,
            cr: 15,

            segments: [],

        }, st)

        this.grow({
            x:   0,
            y:   0,
            r:   2,

            phi: 0,
            R:   0,

            phiStep: .4,
            rStep:    0.1,
            RStep:    0.6,

            rFac:    1.01,
            phiFac:  1.05,
            RFac:    1.01,

            steps: 25,
        })
    }

    grow(st) {
        const x = cos(st.phi) * st.R,
              y = sin(st.phi) * st.R

        this.segments.push({
            x: x,
            y: y,
            r: st.r,
        })

        if (st.steps > 0) {
            const next = {
                x:   x,
                y:   y,
                r:   st.r + st.rStep,

                phi: st.phi + st.phiStep,
                R:   st.R   + st.RStep,

                phiStep: st.phiStep * st.phiFac,
                RStep:   st.RStep   * st.RFac,
                rStep:   st.rStep   * st.rFac,

                phiFac: st.phiFac,
                RFac:   st.RFac,
                rFac:   st.rFac,

                steps:  st.steps - 1,
            }
            this.grow(next)
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        fill(this.color)

        for (let i = 0; i < this.segments.length; i++) {
            const seg = this.segments[i]
            circle(seg.x, seg.y, seg.r)
        }

        if (env.debug && env.debugContact) {
            lineWidth(1)
            stroke('#ffff00')
            circle(0, 0, this.cr)
        }

        restore()
    }

}
