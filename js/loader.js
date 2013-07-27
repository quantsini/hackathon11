// - 'c' is the canvas (accessed by its 'id')
// - 's' is the entire string read from the PNG (for bootstrap.js to use)
// - 't' is the 2d drawing context
eval(
    s = String.fromCharCode.apply(
        t = c.getContext('2d'),
        t.getImageData(
            0,
            0,
            c.width = __PNGWIDTH__,
            1,
            t.drawImage(this, 0, 0)
        ).data
    ).replace(/\xff/g,'')
)
