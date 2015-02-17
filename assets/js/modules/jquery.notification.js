// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "notify",
				defaults = {
				containerClass: "notification__container",
				notificationClass: "notification__item",
				entranceAnimate: "fadeInUp",
				exitAnimate: "fadeOutUp",
				showTime: 3000
		};

	    var setupLayout = function () {
        var container = $('body').append('<div class="notification__container"> </div>');
        $('.notification-page').append('<button class="add-notification">Add button</button>');
        m.notification.$button = $('.add-notification');
        console.log(m.notification.$button);

    	};


		// The actual plugin constructor
		function Notify ( element, options ) {
				this.element = element;
				this.container = $(element);
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();

		}

		function notification(){
			return '<div class="notification__message"></div>';
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Notify.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).
						this.container.append('<div class="notification-container"></div>');
						this.$notificationContainer = $('.notification-container', 'body');
						console.log("xD");
				},
				addNotification: function () {
						// some logic
				        $('.notification__container').append('<div class="notification__item">' + currentNotification++ + '</div>');
				        var $notification = $('.notification__item');
				        $notification.addClass('animated fadeInUp');
				        setTimeout(function() {
				            $notification.addClass('fadeOutUp');
				            $notification.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', removeNotification($notification));
				        }, 3000);

				},
				removeNotification: function($el){
			        setTimeout(function(){
			            $el.remove();
			        }, 1000)
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Notify( this, options ) );
						}
				});
		};

})( jQuery, window, document );
