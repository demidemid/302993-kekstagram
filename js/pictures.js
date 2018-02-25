'use strict';

(function () {

  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  var gallery = document.querySelector('.gallery-overlay');
  var picture = document.querySelectorAll('.picture');
  var closeButton = document.querySelector('.gallery-overlay-close');

  var onCloseButtonClick = function () {
    gallery.classList.add('hidden');
  };

  var onPicturePrewiewClick = function () {
    gallery.classList.remove('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
  };

  closeButton.addEventListener('click', function () {
    onCloseButtonClick();
    document.removeEventListener('keydown', window.onPopupEscPress);
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      gallery.classList.add('hidden');
    }
  });

  for (var p = 0; p < picture.length; p++) {
    picture[p].addEventListener('click', function (evt) {
      evt.preventDefault();
      onPicturePrewiewClick();
      var currentPicture = evt.currentTarget;
      gallery.querySelector('.gallery-overlay-image').src = currentPicture.querySelector('img').src;
      gallery.querySelector('.likes-count').textContent = currentPicture.querySelector('.picture-likes').textContent;
      gallery.querySelector('.comments-count').textContent = currentPicture.querySelector('.picture-comments').textContent;
    });
  }
})();
