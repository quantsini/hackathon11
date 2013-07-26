c = document.createElement('canvas');
w = c.width = __PNGWIDTH__;
with(c.getContext('2d'))
    drawImage(this, o='', i=0),
    d = getImageData(0,0,w,1).data;

for (s=__SCRIPTSIZE__; o.length < s; ++i) {
    o += i % 4 - 3 ? String.fromCharCode(d[i]) : '';
}
eval(o);

