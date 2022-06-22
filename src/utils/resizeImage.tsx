// pessoal que ajudou a montar a função: https://stackoverflow.com/questions/14672746/how-to-compress-an-image-via-javascript-in-the-browser

// Take an image URL, downscale it to the given width, and return a new image URL.
export function resizeImage(blobURL, setState) {
    // Provide default values
    const imageType = "image/jpeg";
    const imageArguments = 0.75;

    const newWidth = 150

    // Create a temporary image so that we can compute the height of the downscaled image.
    const image = new Image();
    image.src = blobURL;

    image.onload = function () {
        const oldWidth = image.width;
        const oldHeight = image.height;
        const newHeight = Math.floor(oldHeight / oldWidth * newWidth)

        // Create a temporary canvas to draw the downscaled image on.
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw the downscaled image on the canvas and return the new data URL.
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        const newDataUrl = canvas.toDataURL(imageType, imageArguments);
        console.log(newDataUrl)
        setState(newDataUrl)
    }
}