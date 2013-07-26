(function() {

// Input globals:  s (script length), d (PNG-extracted data array)
// Output globals: getAsset, getAssetArray

var assets = [];

getAsset = function(index) {
    var array = getAssetArray(index);
    var result = '';
    for (var i = 0; i < array.length; ++i) {
        result += String.fromCharCode(array[i]);
    }
    return result;
}

getAssetArray = function(index, type) {
    return new (type || Uint8Array)(assets[index]);
}

function getByte(index) {
    var offset = index % 3;
    var base = index - offset;
    return d[base / 3 * 4 + offset] || 0;
}

function unpackAssets() {
    var index = s,
        n = 0;

    while (1) {
        var size = getNum(getByte(index), getByte(index + 1));
        if (!size)
            break;
        index = index + 2;

        var data = new Uint8Array(size);
        for(var i = 0; i < size; i ++) {
            data[i] = getByte(i + index);
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

//eval(getAsset('js/main.js'));
eval(getAsset('js/stars.js'));

})();
