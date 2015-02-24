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
			showTime: 3000,
			exitTime: 1000,
			entranceTime: 1000,
			entranceAnimation: 'slideUp',

		}, 
		pluginName = 'my_notification',
		settings = {};

	    var setupLayout = function ($el, settings) {
	        var container = settings.$element.append('<div class="' + settings.containerClass +'"> </div>');
	        //$('.notification-page').append('<button class="add-notification">Add button</button>');
	        settings.$container = $('.' + settings.containerClass);	        
	        if(settings.addButtonClass){
		        settings.$addButton = $('.' + settings.addButtonClass);
	        }
    	};

	    var _bindEvents = function() {
	    	debugger;
	    	if(settings.hasOwnProperty('$addButton')){
		        settings.$addButton.on("click", function(e){
	            	addNotification();
	        	});
	    	}

            //close event
	        settings.$container.on("click", '.close-button' , function(e){
	            e.stopPropagation();
	            $(this).parent().fadeOut(500, function(){
	                $(this).remove();
	            });
	        });
    };


		// The actual plugin constructor
		function Notify ( element, options ) {
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend({}, defaults, options );
				this._defaults = defaults;

				this.settings.$element = $(element);
				//this.settings.$container = $(element);

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
						settings = this.settings;
						_bindEvents();
				},
				addNotification: function () {
    				var $notificationItem = $('<div class="notification__item">' + 'Text' + '<button class="close-button" role="button">x</button></div>');
					if(this.settings.entranceAnimation == 'slideLeft'){
						// some logic
        				$notificationItem.addClass('notification__item--show notification__item--slide-left').css('opacity', 0)
										    .appendTo($('.notification__container'))
											.animate({opacity: 0.8, left: '0'}, 
												     {queue: false, 
												      duration: settings.entranceTime,
												      complete: this.removeNotification($notificationItem)
												  	 }
												     );
					}
					else{
        				$notificationItem.css({"display" : "none"}).css('opacity', 0)
										    .addClass('notification__item--show')
										    .appendTo($('.notification__container')).slideDown(500)
                                            .animate(
                                                    { opacity: 0.8 },
                                                    { queue: false, 
                                                      duration: 300,
                                                      complete: this.removeNotification($notificationItem)
                                                    }
                                                 );
					}
					

				},
				removeNotification: function($el){
			        setTimeout(function(){
			            $el.animate(
									{ opacity: 0 },
									{ queue: false, 
									duration: settings.exitTime,
									complete: function(){$(this).remove()}
									}
								);
			        }, settings.showTime);
			    }
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options, overwrite) {
				var returnArray = [];
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) || overwrite) {
								$.data( this, "plugin_" + pluginName, new Notify( this, options ) );
								returnArray.push($(this).data("plugin_" + pluginName));
						}
				});
				if(returnArray.length == 1){
					return returnArray[0];
				}else{
					return returnArray;
				}

		};

})( jQuery, window, document );
