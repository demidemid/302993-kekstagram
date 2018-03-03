'use strict';

(function () {
  var pictureList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var filters = document.querySelector('.filters');
  var allPhotos = document.querySelectorAll('.picture');

  // функция рэндеринга изображений
  var renderImage = function (picture) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  };

  var clearPhotos = function () {
    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var showPictures = function (pictures) {
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderImage(pictures[i]));
    }
    pictureList.appendChild(fragment);
  };

  var filterChange = function (pictures, value) {
    var picturesCopy = pictures.slice();
    var pictureRecommend = pictures.slice();
    var filteredPictures;
    clearPhotos();

    var getValue = function () {
      switch (value) {
        case 'popular': {
          filteredPictures = picturesCopy.sort(function (a, b) {
            return b.likes - a.likes;
          });
          break;
        }
        case 'discussed': {
          filteredPictures = picturesCopy.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
          break;
        }
        case 'recommend': {
          filteredPictures = pictureRecommend;
          break;
        }
        case 'random': {
          filteredPictures = picturesCopy.sort(function () {
            return Math.random() - 0.5;
          });
          break;
        }
      }

      successHandler(filteredPictures);
    };

    window.debounce.debounce(getValue);
  };

  var successHandler = function (pictures) {
    showPictures(pictures);
    allPhotos = document.querySelectorAll('.picture');
    window.showBigPicture(allPhotos);
    filters.classList.remove('filters-inactive');

    filters.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {
        var value = evt.target.value;

        filterChange(pictures, value);
      }
    });
  };

  window.load(successHandler, window.errorHandler);
})();
