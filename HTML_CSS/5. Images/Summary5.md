# Images

    There are many reasons why you might want to add an image to a web page: 
you might want to include a logo, photograph, illustration, diagram, or chart.

    There are several things to consider when selecting and preparing images
for your site, but taking time to get them right will make it look more
attractive and professional.

Here we:
- Include an image in your web pages using HTML
- Pick which image format to use
- Show an image at the right size
- Optimize an image for use on the web to make pages
load faster

Three Rules for Creating Images
1) Save Images in the Right Format

    Websites mainly use images in jpeg, gif, or png format. If you
choose the wrong image format then your image might not look as sharp
as it should and can make the web page slower to load.

2) Save Images at the Right Size

    You should save the image at the same width and height it will
appear on the website. If the image is smaller than the width or 
height that you have specified, the image can be distorted and stretched.
If the image is larger than the width and height if you have specified,
the image will take longer to display on the page.

3) Use the Correct Resolution

    Computer screens are made up of dots known as pixels. Images
used on the web are also made up of tiny dots. Resolution refers
to the number of dots per inch, and most computer screens only
show web pages at 72 pixels per inch. So saving images at
a higher resolution results in images that are larger than
necessary and take longer to download.

            -------- Image Formats  -------- 
    JPEG - Whenever you have many different colors in a picture. 

A photograph that features snow or an overcast sky might look like it has large
areas that are just white or gray, but the picture is usually made up of many
different colors that are subtly different.

    GIF/PNG - when saving images with few colors or large
areas of the same color.

When a picture has an area that is filled with exactly the same color, it is
known as flat color. Logos, illustrations, and diagrams often use flat colors.
(Note that photographs of snow, sky, or grass are not flat colors, they are
made up of many subtly different shades of the same color and are not as
suited to GIF or PNG format.)

            -------- Image Dimensions  -------- 
    The images you use on your website should be saved at the same width and
    height that you want them to appear on the page.

                ---- Reducing Image Size  ----
You can reduce the size of images to create a smaller version of the image.

Example: If your image is 600 pixels wide and 300 pixels tall,
you can reduce the size of the image by 50%.

Result: This will create an image that is quicker to download.

                ---- Increasing Image Size ----
You can't increase the size of photos significantly without
affecting the image quality.   

Example: If your image is only 100 pixels wide by 50 pixels tall,
increasing the size by 300% would result in poor quality.

Result: The image will look blurry or blocky.

                ---- Changing Shape ----
Only some images can be cropped without losing valuable information.

Example: If your image is 300 pixels square, you can remove
parts of it, but in doing so you might lose valuable information.

Result: Only some images can be cropped and still make sense.

When cropping images it is important not to lose valuable information. 
It is best to source images that are the correct shape if possible.

        =========== Image Resolution ===========
Images created for the web should be saved at a resolution of 72 ppi. 
The higher the resolution of the image, the larger the size of the file.

Bitmap - The type of image format that JPGs, GIFs, & PNGs belong to, they are
made up of lost of miniature squares. The resolution of an image is the
number of squares that fit within a 1 inch x 1 inch square area.

Images appearing on computer screens are made of tiny squares called pixels.

    Pixels Per Inch (PPI) vs Dots Per Inch (DPI)

The web browsers on most desktop computers display images at a
resolution of 72 pixels per inch (ppi). Images in print materials
(such as books and magazines) are made up of tiny circles called
dots. These images are usually printed at a resolution of 300
dots per inch (dpi).

Due to the fact that computer displays are capped at a resolution of 72 ppi,
using images on the web with a higher resolution will not result in better
image quality — only in larger file sizes, which will increase the
time needed to load them and therefore slow down viewing of
your web pages.

        =============== Vector Images ===============
Vector images differ from bitmap images and are resolution-independent. 
Vector images are commonly created in programs such as Adobe Illustrator.

When an image is a line drawing (such as a logo, illustration, or diagram),
designers will often create it in vector format.

Vector formatted images are very different to bitmap images.
Vector images are created by placing points on a grid, and drawing lines 
between those points. A color can then be added to "fill in" the lines that
have been created.

The advantage of creating line drawings in vector format is that
you can increase the dimensions of the image without affecting
the quality of it.

The current method of using vector images for display on websites involves
saving a bitmap version of the original vector image and using that.
Scalable Vector Graphics (SVG) are a relatively new format used to display
vector images directly on the web (eliminating the need to create bitmap
versions of them), however its use is not yet widespread.

            ---------- Animated Gifs ----------
Animated GIFs show several frames of an image in sequence and therefore can be
used to create simple animations.

Because GIFs are not an ideal format for displaying photographs, animated GIFs
are really only suitable for simple illustrations.

Each extra frame of the image increases the size of the file, and
can therefore add to the time it takes for an image to download

            ---------- Transparency  ----------
Creating an image that is partially transparent (or "see-through") for the web
involves selecting one of two formats: Transparent GIF or PNG

If the transparent part of the image has straight edges and
it is 100% transparent (that is, not semi-opaque), you can save
the image as a GIF (with the transparency option selected).

If the transparent part of the image has diagonal or rounded
edges or if you want a semiopaque transparency or a dropshadow,
then you will need to save it as a PNG.

Note: Transparent PNGs are not fully supported in older browsers,
most notably Internet Explorer 6 (IE6). 

                -------- Summary  -------- 
- The <img> element is used to add images to a web page.

- You must always specify a src attribute to indicate the
source of an image and an alt attribute to describe the
content of an image.

- You should save images at the size you will be using
them on the web page and in the appropriate format.

- Photographs are best saved as JPEGs; illustrations or
logos that use flat colors are better saved as GIFs.
