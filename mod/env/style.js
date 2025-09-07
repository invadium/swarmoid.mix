const style = {

    color: {
        main:  '#6b1fb1',
        title: '#6b1fb1',

        fruit: '#c09020',
    },
    
    font: {
        main: {
            family: 'moon',
            size:   24,
        },
        title: {
            family: 'moon',
            size:   64,
        },
        menu: {
            family: 'moon',
            size:   32,
        },
        menuHigh: {
            family: 'moon',
            size:   36,
        },
        credits: {
            family: 'moon',
            size:   32,
        },

        debug: {
            family: 'moon',
            size: 24,
        },
    },
}

function classifyFonts() {
    for (let id in style.font) {
        const font = style.font[id]
        font.id = id
        font.head = font.size + 'px ' + font.family
    }
}

(function setupStyles() {
    classifyFonts()
})()

