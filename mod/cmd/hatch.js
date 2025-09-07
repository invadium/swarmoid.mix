function hatch(args, line, con) {
    let count = 1
    let team  = 0

    if (args[1]) {
        count = parseInt(args[1])
        if (!isNumber(count)) throw 'number of boids is expected'
    }
    if (args[2]) {
        team = parseInt(args[2])
        if (!isNumber(team)) throw 'team number is expected'
    }

    const hives = lab.port.filter(e => e instanceof dna.Hive)
    if (team === 0) {
        while (count > 0) {
            hives[0].spawn()
            count --
            if (count > 0) {
                hives[1].spawn()
                count --
            }
        }
    } else {
        for (let i = 0; i < count; i++) hives[team - 1].spawn()
    }
}
hatch.info = 'spawn a boid or multiple if the number is provided'
