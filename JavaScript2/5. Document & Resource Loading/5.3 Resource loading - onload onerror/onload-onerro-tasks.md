# Load images with a callback

Normally, images are loaded when they are created. So when we add `<img>` to the page, the user does not see the picture immediately. The browser needs to load it first.

To show an image immediately, we can create it "in advance", like this:

```js
let img = document.createElement('img');
img.src = 'my.jpg';
```

The browser starts loading the image and remembers it in the cache. Later, when the same image appears in the document (no matter how), it shows up immediately.

**Create a function `preloadImages(sources, callback)` that loads all images from the array `sources` and, when ready, runs `callback`.**

For instance, this will show an `alert` after the images are loaded:

```js
function loaded() {
  alert("Images loaded")
}

preloadImages(["1.jpg", "2.jpg", "3.jpg"], loaded);
```

In case of an error, the function should still assume the picture "loaded".

In other words, the `callback` is executed when all images are either loaded or errored out.

The function is useful, for instance, when we plan to show a gallery with many scrollable images, and want to be sure that all images are loaded.

In the source document you can find links to test images, and also the code to check whether they are loaded or not. It should output `300`.

---

## Starter Code

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

  <script>
    function preloadImages(sources, callback) {
      /* your code */
    }

    // ---------- The test ----------

    let sources = [
      "https://en.js.cx/images-load/1.jpg",
      "https://en.js.cx/images-load/2.jpg",
      "https://en.js.cx/images-load/3.jpg"
    ];

    // add random characters to prevent browser caching
    for (let i = 0; i < sources.length; i++) {
      sources[i] += '?' + Math.random();
    }

    // for each image,
    // let's create another img with the same src and check that we have its width immediately
    function testLoaded() {
      let widthSum = 0;
      for (let i = 0; i < sources.length; i++) {
        let img = document.createElement('img');
        img.src = sources[i];
        widthSum += img.width;
      }
      alert(widthSum);
    }

    // every image is 100x100, the total width should be 300
    preloadImages(sources, testLoaded);
  </script>

</body>
</html>
```

---

## **Answer:** See `loadImages.html`

The algorithm:
1. Make `img` for every source.
2. Add `onload/onerror` for every image.
3. Increase the counter when either `onload` or `onerror` triggers.
4. When the counter value equals to the sources count -- we're done: `callback()`.