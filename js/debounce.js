'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  window.debounce = {
    debounce: function (func) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
    }
  };
})();
