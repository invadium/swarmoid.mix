function debug(args, line, con) {
    env.debug = !env.debug
    con.print('debug: ' + (env.debug? 'on' : 'off'))
}
debug.info = 'switch debug on/off'
