'use strict';

(function () {
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  window.gallery = document.querySelector('.gallery-overlay');
  window.picture = document.querySelectorAll('.picture');
  var closeButton = document.querySelector('.gallery-overlay-close');

  var onCloseButtonClick = function () {
    window.gallery.classList.add('hidden');
  };

  closeButton.addEventListener('click', function () {
    onCloseButtonClick();
    document.removeEventListener('keydown', window.onPopupEscPress);
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.gallery.classList.add('hidden');
    }
  });
})();
