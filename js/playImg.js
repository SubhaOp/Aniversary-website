var btn = document.getElementById("heartTxt");
btn.style.opacity = 0;
var btnVal = 0;
var showImageInterval;
var imgInterval;
var buttonInterval;
var slideshowInterval = null;
var slideshowStarted = false;

function showImage() {
    if (!imageArray.length) return;
    myImage.src = imageArray[imageIndex];
    myTxt.textContent = txtArray[imageIndex] || "";
    imageIndex = (imageIndex + 1) % len;
}

function play() {
    // The heart toggles between the opening message and the photo gallery.
    flag = 1 - flag;
    document.getElementById("typeDiv").style.opacity = flag;
    document.getElementById("imgTxt").style.opacity = 1 - flag;
    document.getElementById("imgTxt").style.pointerEvents = flag ? "none" : "auto";

    if (!slideshowStarted) {
        slideshowStarted = true;
        imageIndex = 0;
        showImage();
        slideshowInterval = setInterval(showImage, 2800);
    }
}

function preshowImage() {
    // Keep the original intro sequence but do not overwrite the gallery after it starts.
    if (slideshowStarted || !imageArray.length) return;
    document.getElementById("imgTxt").style.opacity = 0;
    myImage.src = imageArray[imageIndex];
    myTxt.textContent = txtArray[imageIndex] || "";
    imageIndex = (imageIndex + 1) % len;
}

function buttonFadeIn() {
    if (btnVal < 1) {
        btnVal = Math.min(1, btnVal + 0.04);
        btn.style.opacity = btnVal;
    } else {
        clearInterval(buttonInterval);
        buttonInterval = null;
        if (ok === 3) ok += 1;
    }
}

function event() {
    showImageInterval = setInterval(preshowImage, 700);
    imgInterval = setInterval(function () {
        if (ok >= 3) {
            clearInterval(imgInterval);
            imgInterval = null;
            setTimeout(function () {
                if (!buttonInterval) buttonInterval = setInterval(buttonFadeIn, 50);
            }, 700);
        }
    }, 50);
}
event();
