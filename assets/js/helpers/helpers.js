
window.APP = (function (module, $) {
    "use strict";
    
    module.HELPER = (function (module, $) { 

        var submodule = {};

        var device = {};
    
        /**
          * @desc checks for touch support - uses touchevents  & msPointer events. Adds CSS class 'supports-touch' if true
          * @return boolean
        */
        device.supportsTouch = (function() {
            var isTouch = !!('ontouchstart' in window) || !!window.navigator.msMaxTouchPoints;
            if (isTouch) {
                var htmlTag = document.getElementsByTagName('html')[0];

                htmlTag.className = htmlTag.className.replace(/(?:^|\s)no-touch-support(?!\S)/, 'supports-touch');
            }
            return isTouch;
        })();

        /**
          * @desc checks html tag for specified CSS class
          * @param string version - the CSS class you want to check the existence of
          * @return boolean
        */
        device.isIE = function(version) {
            var cssClass = (version) ? version : 'ie',
                element = document.getElementsByTagName("html")[0];
            return element.className && new RegExp("(^|\\s)" + cssClass + "(\\s|$)").test(element.className);
        };
    
        submodule.DEVICE = device;
  
    
        /**
          * @desc validates a string as a valid email
          * @param string email - the string you want to validate
          * @return boolean
        */
        submodule.isEmail = function (email) {
            var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);    
        }
    
        /**
          * @desc pads out a number with zeros to a minimum length
          * @param int number - the number you want to convert
          * @param int size - minimum length of return string
          * @return string
        */
        submodule.pad = function (number, size) {
            var s = number + "";
            while (s.length < size) s = "0" + s;
            return s;
        };
    
        /**
          * @desc gets the value of a hash parameter
          * @param url - the string from which to extract the value
          * @param paramName - the name of the hash
          * @return string or null
        */
        submodule.getHashParameter = function (url, paramName) {
            var searchString = url.split("#");

            if (searchString.length < 2) {
                return null;
            }

            var i, val, params = searchString[1].split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        };
    
        /**
          * @desc get the value from a name/value pair
          * @param name - the name of the name/value pair
          * @param string - the string from which to extract the value
          * @return string or null
        */
        submodule.getParamFromString = function (name, string) {
            if (!name && !string) {
                return;
            }
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(string);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    
        /**
          * @desc shuffles the order of an Array
          * @param array - the array you want to shuffle 
          * @return shuffled array
        */
        submodule.shuffleArray = function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        };
    
        return submodule;

    }(module, $));
    
    return module;
    

})(window.APP || {}, window.jQuery);

