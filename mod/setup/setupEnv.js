function setupEnv() {

    for(let k in env.config) {
        const v = env.config[k]
        if (k.startsWith('debug') || k.startsWith('test') || k.startsWith('enable') || k.startsWith('disable')) {
            env[k] = v
        }
    }

}
setupEnv.Z = 1
