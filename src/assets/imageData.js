var pixels = imageData.data;
var w = imageData.width;
var h = imageData.height;

var l = w * h;
for (var i = 0; i < l; i++) {
    // get color of pixel
    var r = pixels[i*4]; // Red
    var g = pixels[i*4+1]; // Green
    var b = pixels[i*4+2]; // Blue
    var a = pixels[i*4+3]; // Alpha

    // get the position of pixel
    var y = parseInt(i / w, 10);
    var x = i - y * w;
}
