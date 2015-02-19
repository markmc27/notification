window.APP = (function (module, $) {
    "use strict";

    var m = module;

    m.notification = {}; // progress bar module

    /**
      * @desc count how many items within progress bar list and apply css class
    */
    var setupLayout = function () {
        var container = $('body').append('<div class="notification__container"> </div>');
        $('.notification-page').append('<button class="add-notification">Add button</button>');
        m.notification.$button = $('.add-notification');
        m.notification.$container = $('.notification__container');

        console.log(m.notification.$button);

    };

    var currentNotification = 1; // assuming this will come from angular

    function addNotification(){
        var $notificationItem = $('<div class="notification__item">' + currentNotification++ + '<button class="close-button" role="button">x</button></div>');
        $notificationItem.css({"display" : "none"}).addClass('notification__item--show').appendTo($('.notification__container')).slideDown(500, function(){
            // $(this).addClass('notification__item--show');
        });

        //auto remove
        setTimeout(function() {
            removeNotification($notificationItem);
        }, 3000);

    };

    function removeNotification($el){
        $el.fadeOut(500, function(){
            this.remove()});
    };

    var _bindEvents = function() {
        m.notification.$button.on("click", function(e){
            addNotification();
        });

                //close event
        m.notification.$container.on("click", '.close' , function(e){
            e.stopPropagation();
            $(this).parent().fadeOut(500, function(){
                $(this).remove();
            });
        });
    };



    // modules to fire on pageload
    m.notification.init = function () {

        if($('.notification-page').length === 0) {
            return true;
        }
        
        setupLayout();
        _bindEvents();

    };

    return module;

})(window.APP || {}, window.jQuery);