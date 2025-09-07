function evo(dt) {
    const ls = lab.port.swarm._ls,
          targets = lab.port._ls
    env.dt = dt

    for (let i = ls.length - 1; i >= 0; i--) {
        const hitter = ls[i]

        if (!hitter.dead) {
            for (let j = targets.length - 1; j >= 0; j--) {
                const target = targets[j]
                if (!target.dead && target.collide) target.collide(hitter)
            }
        }
        /*
        for (let j = ls.length - 1; j >= 0; j--) {
            const boid1 = ls[i],
                  boid2 = ls[j]

            if (boid1 !== boid2 && boid1.team !== boid2.team && !boid1.dead && !boid2.dead
                    && distance(boid1.x, boid1.y, boid2.x, boid2.y) < boid1.cr + boid2.cr) {
                boid1.dead = true
                boid2.dead = true
            }
        }
        */
    }
}
