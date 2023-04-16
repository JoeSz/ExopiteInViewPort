/*!
 * exopiteInViewPort 20230416 - 2023-04-16
 * https://github.com/JoeSz/ExopiteInViewPort
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Disclaimer
 * https://www.joeszalai.org/disclaimer/
 */
; (function ($, window, document, undefined) {

    "use strict";

    var pluginName = "exopiteInViewPort";

    function Plugin(element, options) {
        this.element = element;

        this.settings = $.extend({
            offset: 0,
            throttle: 100,
            paddingTop: 0,
            paddingBottom: 0,
            onInit: function (element) {},
            onEnter: function (element, direction) {},
            onLeft: function (element, direction) {},
            onWholeInside: function (element, inViewport) {}
        }, options);
        this._name = pluginName;
        this.$element = $(element);
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var plugin = this;
            plugin.settings.onInit.call(this, plugin.$element);
            plugin.buildCache();
            plugin.bindEvents();
            plugin.checkViewport();
        },
        bindEvents: function () {
            var plugin = this;
            $(window).on('scroll' + '.' + plugin._name, plugin.throttle(plugin.settings.throttle, function () {
                plugin.checkViewport();
            }));
        },
        destroy: function () {
            this.unbindEvents();
            // this.$element.removeData();
            this.$element.removeData("plugin_" + pluginName);
        },
        unbindEvents: function () {
            this.$element.off('.' + this._name);
            $(window).off('.' + this._name);
        },
        buildCache: function () {
            this.$element = $(this.element);
        },
        throttle: function (delay, callback) {
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
        },
        checkViewport: function () {
            var plugin = this;
            var viewportTop = $(window).scrollTop() + plugin.settings.paddingTop;
            var viewportBottom = viewportTop + $(window).height() - plugin.settings.paddingBottom;
            var elementTop = this.$element.offset().top + this.settings.offset;
            var elementBottom = elementTop + this.$element.outerHeight();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                // Enter

                if (elementTop >= viewportTop && elementBottom <= viewportBottom) {

                    if (!plugin.$element.data('inviewport')) {
                        plugin.$element.data('inviewport', true);
                        plugin.$element.data('partlyinviewport', false);
                        plugin.settings.onWholeInside.call(this, plugin.$element, true);
                    }

                } else if (elementTop < viewportTop) {

                    if (!plugin.$element.data('partlyinviewport')) {
                        plugin.$element.data('partlyinviewport', true);

                        if (!plugin.$element.data('inviewport')) {
                            plugin.settings.onEnter.call(this, plugin.$element, 'top');
                        } else {
                            plugin.settings.onWholeInside.call(this, plugin.$element, false);
                        }

                        plugin.$element.data('inviewport', false);
                    }

                } else if (elementBottom > viewportBottom) {

                    if (!plugin.$element.data('partlyinviewport')) {
                        plugin.$element.data('partlyinviewport', true);

                        if (!plugin.$element.data('inviewport')) {
                            plugin.settings.onEnter.call(this, plugin.$element, 'bottom');
                        } else {
                            plugin.settings.onWholeInside.call(this, plugin.$element, false);
                        }

                        plugin.$element.data('inviewport', false);
                    }

                }

            } else {
                if (plugin.$element.data('inviewport') || plugin.$element.data('partlyinviewport')) {
                    // if scroll is too fast, in the "enter" section the onWholeInside false do not have a time to call.
                    if (plugin.$element.data('inviewport')) {
                        plugin.settings.onWholeInside.call(this, plugin.$element, false);
                    }

                    plugin.$element.data('inviewport', false);
                    plugin.$element.data('partlyinviewport', false);

                    if (elementTop > viewportBottom) {
                        plugin.settings.onLeft.call(this, plugin.$element, 'bottom');
                    } else if (elementBottom < viewportTop) {
                        plugin.settings.onLeft.call(this, plugin.$element, 'top');
                    }

                }
            }

        }
    });

    $.fn[pluginName] = function (options) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var instance = $.data(this, "plugin_" + pluginName);

            if (!instance) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            } else if (typeof options === 'string' && typeof instance[options] === 'function') {
                instance[options].apply(instance, args);
            }
        });
    };

})(jQuery, window, document);
