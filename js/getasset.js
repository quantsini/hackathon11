function getAsset(name) {
    req = new XMLHttpRequest();
    req.open('get', name, false);
    req.send();
    return req.responseText;
}
