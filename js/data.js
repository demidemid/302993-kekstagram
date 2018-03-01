'use strict';

(function () {
  var pictureList = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderImage = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 1; i < pictures.length; i++) {
      fragment.appendChild(renderImage(pictures[i]));
    }
    pictureList.appendChild(fragment);

    var pictureItems = pictureList.querySelectorAll('.picture');
    window.showBigPicture(pictureItems);
  };

  window.load(successHandler, window.errorHandler);
})();
