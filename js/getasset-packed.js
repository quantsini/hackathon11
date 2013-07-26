function getAsset(index) {
    return assets[index];
}

function getByte(index) {
    var offset = index % 3;
    var base = index - offset;
    return d[base / 3 * 4 + offset] || 0;
}

function unpackAssets() {
    var index = s,
        n = 0;
    assets = [];

    while (1) {
        var size = getNum(getByte(index), getByte(index + 1));
        if (!size)
            break;
        index = index + 2;

        var data = '';
        for(var i = index; i < index + size; i ++) {
            data = data + String.fromCharCode(getByte(i));
        }
        assets.push(data);
        index = index + size;
        n = n + 1;
    }
}

function getNum(a, b) {
    return a + b * 256;
} 

unpackAssets();

with (document.body) {
    style.margin = 0;
    style.padding = 0;

    firstChild.style.display = 'none';
}
