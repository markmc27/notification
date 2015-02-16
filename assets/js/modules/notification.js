
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
        console.log(m.notification.$button);

    };

    var currentNotification = 1; // assuming this will come from angular

    function addNotification(){
        $('.notification__container').append('<div class="notification__item">' + currentNotification++ + '</div>');
        var $notification = $('.notification__item');
        $notification.addClass('animated fadeInUp');
        setTimeout(function() {
            $notification.addClass('fadeOutUp');
            $notification.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', removeNotification($notification));
        }, 3000);

    };

    function removeNotification($el){
        setTimeout(function(){
            $el.remove();
        }, 1000)
    };

    var _bindEvents = function() {
        m.notification.$button.on("click", function(e){
            addNotification();

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