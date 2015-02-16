
window.APP = (function (module, $) {
    "use strict";
    
    $(function(){ 
      module.form.init();
      module.bookingForm.init();
      module.progressBar.init();
      module.bookingDetailsComponent.init();
      $('input[type="number"]').stepper({min : 1, max: 5});
      module.notification.init();
    });
    
    return module;
    

})(window.APP || {}, window.jQuery);

