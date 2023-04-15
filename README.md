# ExopiteInViewPort
jQuery plugin to check if element is in viewport.

## Why?
I am looking for a jQuery plugin that can detect when an element enters or leaves the viewport, as well as the direction of entry/exit. It is important that the plugin utilizes scroll throttling and has a small JavaScript file size. Additionally, I would like to be able to check when the entire element is in the viewport.

## Triggers for the element
- onEnter with direction (top, bottom)
  To check, when the element or a part is already entered in viewport
- onLeft with direction (top, bottom)
  To check, when the element or a part is left the viewport
  *eg.: if you want some animation or style the "reset", but only if it is not visivle anymore.*
- onWholeInside
  To check, if the whole element is in the viewport
  *eg.: if you want to start an animation only if the whole element is visible.*

## Why Throttling
Throttling is a technique used to limit the number of times a function gets executed over a given time period. It can be useful when working with events that can trigger a high number of function calls within a short period, such as scrolling or resizing events.

Using a throttle function can help to optimize the performance of a web application by reducing the number of times a function is called, which in turn can improve the overall user experience. It can also help to prevent unnecessary computations and reduce the load on the server.

For example, imagine a scroll event that triggers a function that calculates the position of an element relative to the viewport. Without throttling, this function would be called many times as the user scrolls, potentially slowing down the application. Throttling the function can limit the number of calls made to the function, allowing it to run smoothly without putting unnecessary strain on the application.

### How to use:
```php
$( selector ).exopiteInViewPort({
    onEnter: function(element, direction) {
        // The element is entered the viewport

        console.log('Element entered from ' + direction);

    },
    onLeave: function(element, direction) {
        // The element is leaved the viewport

        console.log('Element left to ' + direction);

    },
    onWholeInside: function(element, inViewport) {
        // This is true only if the whole element is in viewport.
        // If any part of the element is not visible, this is false.
        // This function is for check if the whole element is in the viewport.

        if (inViewport) {
            console.log('The whole element is inside the viewport');
        } else {
            console.log('Not the whole element is inside the viewport');
        }

    },
    offset: 0, // element offset
    throttle: 100, // ms
    paddingTop: 0, // padding top to viewport
    paddingBottom: 0 // padding bottom to viewport
});
```
### LICENSE DETAILS

The GPL license of Sticky anything without cloning it grants you the right to use, study, share (copy), modify and (re)distribute the software, as long as these license terms are retained.

### DISCLAMER

NO WARRANTY OF ANY KIND! USE THIS SOFTWARES AND INFORMATIONS AT YOUR OWN RISK!
[READ DISCLAMER.TXT!](https://www.joeszalai.org/disclaimer/)
License: GNU General Public License v3

[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/for-you.svg)](http://forthebadge.com)

SUPPORT/UPDATES/CONTRIBUTIONS
-----------------------------

If you use my program(s), I would **greatly appreciate it if you kindly give me some suggestions/feedback**. If you solve some issue or fix some bugs or add a new feature, please share with me or mke a pull request. (But I don't have to agree with you or necessarily follow your advice.)<br/>
**Before open an issue** please read the readme (if any :) ), use google and your brain to try to solve the issue by yourself. After all, Github is for developers.<br/>
My **updates will be irregular**, because if the current stage of the program fulfills all of my needs or I do not encounter any bugs, then I have nothing to do.<br/>
**I provide no support.** I wrote these programs for myself. For fun. For free. In my free time. It does not have to work for everyone. However, that does not mean that I do not want to help.<br/>
I've always tested my codes very hard, but it's impossible to test all possible scenarios. Most of the problem could be solved by a simple google search in a matter of minutes. I do the same thing if I download and use a plugin and I run into some errors/bugs.
