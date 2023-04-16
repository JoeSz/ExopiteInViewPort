/*!
 * exopiteInViewPort 20230416 - 2023-04-16
 * Light version
 *
 * https://github.com/JoeSz/ExopiteInViewPort
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Disclaimer
 * https://www.joeszalai.org/disclaimer/
 */
;(function ($) {

    $.throttle = function (delay, callback) {
        var timeout = null;
        return function () {
            var args = arguments;
            var context = this;
            if (!timeout) {
                timeout = setTimeout(function () {
                    callback.apply(context, args);
                    timeout = null;
                }, delay);
            }
        };
    };

    $.fn.exopiteInViewPort = function (options) {
        var settings = $.extend({
            offset: 0,
            throttle: 100,
            paddingTop: 0,
            paddingBottom: 0,
            onEnter: function (element, direction) {},
            onLeft: function (element, direction) {},
            onWholeInside: function (element, inViewport) {}
        }, options);

        return this.each(function () {
            var $this = $(this);
            var elementTop = $this.offset().top + settings.offset;
            var elementBottom = elementTop + $this.outerHeight();

            function checkViewport() {
                var viewportTop = $(window).scrollTop() + settings.paddingTop;
                var viewportBottom = viewportTop + $(window).height() - settings.paddingBottom;

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    // Enter

                    if (elementTop >= viewportTop && elementBottom <= viewportBottom) {

                        if (!$this.data('inviewport')) {
                            $this.data('inviewport', true);
                            $this.data('partlyinviewport', false);
                            settings.onWholeInside.call(this, $this, true);
                        }

                    } else if (elementTop < viewportTop) {

                        if (!$this.data('partlyinviewport')) {
                            $this.data('partlyinviewport', true);

                            if (!$this.data('inviewport')) {
                                settings.onEnter.call(this, $this, 'top');
                            } else {
                                settings.onWholeInside.call(this, $this, false);
                            }

                            $this.data('inviewport', false);
                        }

                    } else if (elementBottom > viewportBottom) {

                        if (!$this.data('partlyinviewport')) {
                            $this.data('partlyinviewport', true);

                            if (!$this.data('inviewport')) {
                                settings.onEnter.call(this, $this, 'bottom');
                            } else {
                                settings.onWholeInside.call(this, $this, false);
                            }

                            $this.data('inviewport', false);
                        }

                    }

                } else {
                    if ($this.data('inviewport') || $this.data('partlyinviewport')) {
                        // if scroll is too fast, in the "enter" section the onWholeInside false do not have a time to call.
                        if ($this.data('inviewport')) {
                            settings.onWholeInside.call(this, $this, false);
                        }

                        $this.data('inviewport', false);
                        $this.data('partlyinviewport', false);

                        if (elementTop > viewportBottom) {
                            settings.onLeft.call(this, $this, 'bottom');
                        } else if (elementBottom < viewportTop) {
                            settings.onLeft.call(this, $this, 'top');
                        }

                    }
                }

            }

            $(window).on('scroll.exopiteInViewPort resize.exopiteInViewPort', $.throttle(settings.throttle, checkViewport));
            checkViewport();
        });
    };

})(jQuery);
/*
// How to use:
$( selector ).exopiteInViewPort({
    onEnter: function(element, direction) {
        // The element is entered the viewport

        console.log('Element entered from ' + direction);

    },
    onLeft: function(element, direction) {
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
*/
