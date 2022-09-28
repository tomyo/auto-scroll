# auto-scroll
Auto scroll widget to use as a bookmarlet 

## Motivation
Some chords web sites don't have this feature, so why not have it as a bookmarlet?

## Instructions
* Create a new bookmark
* Copy the content of [bookmarlet.js](./bookmarlet.js) into the URL field of the bookmark, save it.
* Click on the bookmark to toggle it.


## Knonw Issues
* Sites using the header `strict-origin-when-cross-origin` won't load the script.

* The way I wrote it seems to only work in Firefox 😅
  - [Writing mode for input elements is not working on chromium based browsers](https://bugs.chromium.org/p/chromium/issues/detail?id=681917&q=meter%20writing-mode&can=2), as I found out trying this widget there. 
  - Gnome Web browser (only one with WebKit I have) doesn't even support bookmarlets: `SyntaxError: Unexpected token '%'`
