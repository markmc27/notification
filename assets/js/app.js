
window.APP = (function (module, $) {
    "use strict";


    $(function(){ 
      //module.notification.init();
      module.notification = $('body').my_notification({});
    });
    
    return module;
    

})(window.APP || {}, window.jQuery);

