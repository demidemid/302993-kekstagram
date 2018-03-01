'use strict';

(function () {

  var pictureList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;

  var renderImage = function (pictures) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = pictures.url;
    pictureElement.querySelector('.picture-likes').textContent = pictures.likes;
    pictureElement.querySelector('.picture-comments').textContent = pictures.comments;

    return pictureElement;
  };

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 1; i < pictures.length; i++) {
      fragment.appendChild(renderImage(pictures[i]));
    }
    pictureList.appendChild(fragment);
  };

  window.load(successHandler, window.errorHandler);
})();
