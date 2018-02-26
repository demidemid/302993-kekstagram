'use strict';

(function () {
  var onPicturePrewiewClick = function () {
    window.gallery.classList.remove('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
  };

  for (var p = 0; p < window.picture.length; p++) {
    window.picture[p].addEventListener('click', function (evt) {
      evt.preventDefault();
      onPicturePrewiewClick();
      var currentPicture = evt.currentTarget;
      window.gallery.querySelector('.gallery-overlay-image').src = currentPicture.querySelector('img').src;
      window.gallery.querySelector('.likes-count').textContent = currentPicture.querySelector('.picture-likes').textContent;
      window.gallery.querySelector('.comments-count').textContent = currentPicture.querySelector('.picture-comments').textContent;
    });
  }
})();
