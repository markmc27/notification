/*
 *  Project: 
 *  Description: 
 *  Author: 
 *  License: 
 */

;(function ( $, window, document, undefined ) {

	"use strict";

		// Create the defaults once
		var defaults = {
			containerClass: 'notification__container',
			notificationClass: 'notification__item',
			addButtonClass: 'add-notification',
			showTime: 5000,
			exitTime: 1000,
			entranceTime: 1000,
			entranceAnimation: 'fadeIn-Up',

		}, 
		pluginName = 'my_notification',
		settings = {};

		/*  Add the notification container*/
	    var _setupLayout = function (settings) {
	    	if(!$('.'+ settings.containerClass, settings.$element).length){
		        var container = settings.$element.append('<div class="' + settings.containerClass +'"> </div>');
	    	}
	        settings.$container = $('.' + settings.containerClass);	        
	        if(settings.addButtonClass){
		        settings.$addButton = $('.' + settings.addButtonClass);
	        }
	    	
    	};

		/*  Bind custom events */
	    var _bindEvents = function(notification) {
	    	if(settings.hasOwnProperty('$addButton')){
		        settings.$addButton.on("click", function(e){
	            	notification.addNotification();
	        	});
	    	}

            //close event
	        settings.$container.on("click", '.close-button' , function(e){
	            e.stopPropagation();
	            _removeNotification($(this).parent());
	        });
    };

    /*  Will remove the notification element */
    var _removeNotification = function($el){
            $el.animate(
						{ opacity: 0 },
						{ queue: false, 
						duration: settings.exitTime,
						complete: function(){$(this).remove()}
						}
					);
			    }


		// The actual plugin constructor
		function Notify ( element, options ) {
				this.settings = $.extend({}, defaults, options );
				this._defaults = defaults;

				this.settings.$element = $(element);
				//this.settings.$container = $(element);

				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Notify.prototype, {
				init: function () {
						_setupLayout(this.settings);
						//easier access to settings 
						settings = this.settings;

						_bindEvents(this);
				},
				/*  Add notification method to add a notification to the container */
				addNotification: function (message) {
					//contstruct notification
    				var $notificationItem = $('<div class="notification__item">' + message + '<button class="close-button" role="button">x</button></div>');
    				//Decides what animation to use depending on settings
					if(this.settings.entranceAnimation == 'slideLeft'){
						// Animates from left and fades in
        				$notificationItem.addClass(this.settings.notificationClass + '--show ' + this.settings.notificationClass +'--slide-left')
        									.css('opacity', 0)
										    .appendTo($('.' + this.settings.containerClass))
											.animate({opacity: 0.8, left: '0'}, 
												     {queue: false, 
												      duration: settings.entranceTime,
												      complete: this.removeNotification($notificationItem)
												  	 }
											     	);
					}
					else{
						//Animates slide up from bottom and fades in
        				$notificationItem.css({"display" : "none"}).css('opacity', 0)
										    .addClass(this.settings.notificationClass + '--show ')
										    .appendTo($('.' + this.settings.containerClass))
                                            .animate(
                                                    { opacity: 0.8,    
                                                	  "height": "show",
												      "marginTop": "show",
												      "marginBottom": "show",
												      "paddingTop": "show",
												      "paddingBottom": "show" },
                                                    { queue: false, 
                                                      duration: settings.entranceTime,
                                                      complete: this.removeNotification($notificationItem)
                                                    }
                                                 );
					}
				},
				//Called in add animation to remove notification after showTime period has passed
				removeNotification: function($notificationItem){
					setTimeout(function(){
						_removeNotification($notificationItem)
				        }, settings.showTime);
					},
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
