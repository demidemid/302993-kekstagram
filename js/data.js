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

  var getRandomIndex = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var showPictures = function (pictures) {
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderImage(pictures[i]));
    }
    pictureList.appendChild(fragment);
  };

  var shufflePictures = function (pictures) {
    var arrayLength = pictures.length;
    var mixedPictures = [];
    while (mixedPictures.length < arrayLength) {
      var randomIndex = getRandomIndex(pictures);
      mixedPictures.push(pictures[randomIndex]);
      pictures.splice(randomIndex, 1);
    }

    return mixedPictures;
  };

  var sortPictures = function (pictures, sortMode) {
    if (sortMode === 'likes') {
      return pictures.sort(function (a, b) {
        return b.likes - a.likes;
      });
    } else if (sortMode === 'comments') {
      return pictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }

    return pictures;
  };

  var filterChange = function (pictures, value) {
    var picturesCopy = pictures.slice();
    var filteredPictures;
    clearPhotos();

    var getValue = function () {
      switch (value) {
        case 'popular': {
          filteredPictures = sortPictures(picturesCopy, 'likes');
          break;
        }
        case 'discussed': {
          filteredPictures = sortPictures(picturesCopy, 'comments');
          break;
        }
        case 'recommend': {
          filteredPictures = sortPictures(picturesCopy);
          break;
        }
        case 'random': {
          filteredPictures = shufflePictures(picturesCopy);
          break;
        }
      }

      successHandler(filteredPictures);
    };

    window.debounce.debounce(getValue);
  };

  function successHandler(pictures) {
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
  }

  window.load(successHandler, window.errorHandler);
})();
