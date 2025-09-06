
function evo(dt) {
    const ls1 = lab.port.omegaSwarm._ls,
          ls2 = lab.port.sigmaSwarm._ls

    for (let i = ls1.length - 1; i >= 0; i--) {
        for (let j = ls2.length - 1; j >= 0; j--) {
            const boid1 = ls1[i],
                  boid2 = ls2[j]

            if (!boid1.dead && !boid2.dead
                    && distance(boid1.x, boid1.y, boid2.x, boid2.y) < boid1.cr + boid2.cr) {
                boid1.dead = true
                boid2.dead = true
            }
        }
    }
}
