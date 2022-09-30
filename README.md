# auto-scroll
Auto scroll widget to use as a bookmarklet 

## Motivation
Some chords web sites don't have this feature, so why not have it as a bookmarklet?

## Instructions
* Create a new bookmark
* Copy the content of [bookmarklet.js](https://tomyo.github.io/auto-scroll/bookmarklet.js) into the URL field of the bookmark, save it.
* Click on the bookmark to toggle it.


## Knonw Issues
* Sites using the header `strict-origin-when-cross-origin` won't load the script.
  - [Here's an issue with a proposal](https://github.com/tomyo/auto-scroll/issues/1) to re-write the bookmarklet in a way it doesn't load any external script.

* Gnome Web browser (only one with WebKit I have) doesn't even support bookmarklets: `SyntaxError: Unexpected token '%'`

## Bugs encountered while developing

  * [Writing mode for input elements is not working on chromium based browsers](https://bugs.chromium.org/p/chromium/issues/detail?id=681917&q=meter%20writing-mode&can=2), as I found out trying this widget there.
    - Styling the `<meter>` element is a pain, so I left it as it is, I prefer it to just work.
