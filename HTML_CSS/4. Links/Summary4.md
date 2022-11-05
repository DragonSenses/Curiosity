# Links

> Links are the defining feature of the web because they allow you to move from one web page to another - enabling the very idea of browsing or surfing. 

## Types of Links:
- Links from one website to another
- Links from one page to another on the same website
- Links from one part of a web page to another part of the same page
- Links that open in a new browser window
- Links that start up your email program and address a new email to someone


## -------- Writing Links  -------- 
- Links are created using the `<a>` element. 
- Users can click on anything between the opening `<a>` tag and the closing `</a>` tag.
- You specify which page you want to link to using the href attribute.
    
> `<a href="http://www.office.com">Office</a>`

- The text between the opening `<a>` tag and closing `</a>` tag is known as link text. 
- Where possible, your link text should explain where visitors will be taken if they click on it (rather than just saying "click here").

- Many people navigate websites by scanning the text for links. Clear link text can help visitors find what they want. This will give them a more positive impression of your site and may encourage them to visit it for longer. (It also helps people using screen reader software.)

- To write good link text, you can think of words people might use when searching for the page that you are linking to.
(e.g., rather than write "places to stay" you could use something more specific such as "hotels in New York.")

---

## Absolute URLs
- URL is Uniform Resource Locator
- Every web page has its own URL.
- This is the web address that you would type into a browser if you wanted
to visit that specific page 
>- An absolute URL starts with the domain name for that site, and can be followed by the path to a specific page. 
>- If no page is specified, the site will display the homepage.

## Relative URLS 
>- Relative URLs can be used when linking to pages within your own website. They provide a shorthand way of telling the browser where to
find your files.

- When linking to other pages within the same site, you can use relative URLs. These are like a shorthand version of absolute URLs because you do not need to specify the domain name.

- Relative URLs help when building a site on your computer because
you can create links between pages without having to set up
your domain name or hosting.

    If all of the files in your site are in one folder, you simply use the
file name for that page.

    If your site is organized into separate folders (or directories),
you need to tell the browser how to get from the page it is
currently on to the page that you are linking to.

    If you link to the same page from two different pages you might,
therefore, need to write two different relative URLs.

These links make use of the same terminology (borrowed from that of family trees)

<br>

***

<br>

## Directory Structure

On larger websites it's a good idea to organize your code by placing the
pages for each different section of the site into a new folder. Folders on a
website are sometimes referred to as directories.

Structure
    The top-level folder is known as the root folder. The root folder
contains all of the other files and folders for a website. Each section
of the site is placed in a separate folder; this helps organize the files.

Relationships
    The relationship between files and folders on a website
is described using the same terminology as a family tree.

Homepages
    The main homepage of a site written in HTML (and the
homepages of each section in a child folder) is called index.html.
Web servers are usually set up to return the index.html file if no
file name is specified.
    Every page and every image on a website has a URL (or Uniform
Resource Locator). The URL is made up of the domain name
followed by the path to that page or image.

                -------- Summary  -------- 
- Links are created using the <a> element

- The <a> element uses the href attribute to indicate
the page you are linking to. 

- If you are linking to a page within your own site, it is
best to use relative links rather than qualified URLs.

- You can create links to open email programs with an
email address in the "to" field.

- You can use the id attribute to target elements within
a page that can be linked to.
