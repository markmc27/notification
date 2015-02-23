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
		var defaults = {
			containerClass: 'notification__container',
			notificationClass: 'notification__item',
			addButtonClass: 'add-notification',
			showTime: 3000
		}, 
		pluginName = 'my_notification';

	    var setupLayout = function ($el, settings) {
	    	debugger;
	        var container = settings.$container.append('<div class="' + settings.containerClass +'"> </div>');
	        //$('.notification-page').append('<button class="add-notification">Add button</button>');
	        if(settings.addButtonClass){
		        this.$addButton = $('.' + settings.addButtonClass);
		        this.$container = $('.' + settings.containerClass);
	        }
    	};


		// The actual plugin constructor
		function Notify ( element, options ) {
				this.$element = $(element);
				this.$container = $(element);
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend({}, defaults, options );
				this._defaults = defaults;
				this.init(this);
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
						setupLayout(this.$element, this.settings);
				},
				addNotification: function () {
						// some logic
    				var $notificationItem = $('<div class="notification__item">' + 'Text' + '<button class="close-button" role="button">x</button></div>');
        			$notificationItem.css({"display" : "none"}).css('opacity', 0).addClass('notification__item--show').appendTo($('.notification__container')).slideDown(500)
                                                                                                                                .animate(
                                                                                                                                        { opacity: 1 },
                                                                                                                                        { queue: false, 
                                                                                                                                          duration: 300,
                                                                                                                                          complete: function(){
                                                                                                                                            removeNotification($notificationItem, this.settings.showTime)
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                     );

				},
				removeNotification: function($el, delay){
			        setTimeout(function(){
			            $el.fadeOut(500, function(){
			                this.remove();
			            });
			        }, delay);
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
