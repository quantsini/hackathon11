(function() {

// Input globals:  s (script length), d (PNG-extracted data array)
// Output globals: getAsset, getAssetArray

getAsset = function(index) {
    return assets[index];
}

var assets = s.split('/*').slice(2);

with (document.body) {
    while (c = firstChild)
        removeChild(c);
    with (style) {
        margin = 0;
        padding = 0;
        backgroundColor = '#000';
    }
}

//eval(getAsset('js/main.js'));
eval(getAsset('js/stars.js'));

})();
