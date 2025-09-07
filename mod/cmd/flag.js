function flag(args, line, con) {

    if (args.length >= 2) {
        const key = args[1]
        env[key] = !env[key]
        con.print(key + ': ' + (env[key]? 'on' : 'off'))
        return
    }

    // list all available flags
    Object.keys(env).forEach(key => {
        const val = env[key]
        if (isBoolean(val)) {
            con.print(key + ': ' + (val? 'on' : 'off'))
        }
    })
}
flag.info = 'switch the named flag or list all set flags in /env'

