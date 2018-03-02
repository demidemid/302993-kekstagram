'use strict';

(function () {
  var pictureList = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture-template').content;

  // функция рэндеринга изображений
  var renderImage = function (picturesArray) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picturesArray.url;
    pictureElement.querySelector('.picture-likes').textContent = picturesArray.likes;
    pictureElement.querySelector('.picture-comments').textContent = picturesArray.comments.length;

    return pictureElement;
  };

  var activeFilters = document.querySelector('.filters');

  // массив для полученных данных с сервера
  var picturesArray = [];

  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();
    // сохраняем данные с сервера в массив
    picturesArray = pictures;

    for (var i = 0; i < picturesArray.length; i++) {
      fragment.appendChild(renderImage(picturesArray[i]));
    }
    pictureList.appendChild(fragment);

    var pictureItems = pictureList.querySelectorAll('.picture');
    window.showBigPicture(pictureItems);

    activeFilters.classList.remove('filters-inactive');
  };

  window.load(successHandler, window.errorHandler);

  var popularPictures = activeFilters.querySelector('#filter-popular');

  var compareLikes = function (a, b) {
    return b.likes - a.likes;
  };

  var showPopular = function () {

    var popItems = picturesArray.sort(compareLikes);
    // console.log(popItems);
    renderImage(popItems);
  };

  popularPictures.addEventListener('click', function () {
    showPopular();
  });
})();
