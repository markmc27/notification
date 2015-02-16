
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

    var currentSection = 5; // assuming this will come from angular

    function addNotification(){
        $('.notification__container').append('<div class="notification__item"> test</div>')
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