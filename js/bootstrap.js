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
    style.margin = 0;
    style.padding = 0;
}

//eval(getAsset('js/main.js'));
eval(getAsset('js/stars.js'));

})();
