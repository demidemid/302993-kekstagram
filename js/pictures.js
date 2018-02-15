'use strict';

(function () {

  var ESC_KEYCODE = 27;
  // var ENTER_KEYCODE = 13;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // функция генерирующая рандомное количество лайков
  var getRandomRange = function (minLikes, maxLikes) {
    return Math.round(minLikes + Math.random() * (maxLikes - minLikes));
  };

  // получаем случайное количество комментариев
  var getRandomCommentsNumber = function (arr) {
    var RandomCommentsNumber = Math.round(Math.random() * arr.length);
    return RandomCommentsNumber;
  };

  // функция которая генерирует массив с объектами
  var getPictures = function () {
    var pictures = [];

    for (var i = 1; i < 26; i++) {
      pictures[i] =
        {
          url: 'photos/' + [i] + '.jpg',
          likes: getRandomRange(15, 200),
          comments: getRandomCommentsNumber(COMMENTS),
        };
    }
    return pictures;
  };

  var pictures = getPictures();
  var pictureList = document.querySelector('.pictures');

  var renderImage = function (picture) {

    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments;

    return pictureElement;
  };


  // создаем фрагмент
  var fragment = document.createDocumentFragment();

  // и воспроизводим шаблоны с помощью фрагмента
  for (var j = 1; j < pictures.length; j++) {
    fragment.appendChild(renderImage(pictures[j]));
  }
  pictureList.appendChild(fragment);

  var gallery = document.querySelector('.gallery-overlay');

  // заполняем окно данными с первой фотографии
  gallery.querySelector('.gallery-overlay-image').src = pictures[1].url;
  gallery.querySelector('.likes-count').textContent = pictures[1].likes;
  gallery.querySelector('.comments-count').textContent = pictures[1].comments;

  // делаем видимым окно галереи
  // gallery.classList.remove('hidden');

  // форма редактирования изображения
  var uploadOverlay = document.querySelector('.upload-overlay');

  // загрузка изображения и показ формы редактирования
  var uploadFile = document.querySelector('#upload-file');
  uploadFile.addEventListener('change', function () {
    statusUploaded();
    imagePreview.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
  });

  var statusUploaded = function () {
    uploadOverlay.classList.remove('hidden');
  };

  // закрытие формы редактирования
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function () {
    uploadOverlay.classList.add('hidden');
  });

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // почему-то не работает
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  uploadOverlay.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.removeEventListener('keydown', onPopupEscPress);
    }
  });

  // применение эффекта для изображения
  var MAX_LEVEL_LINE = 818;
  var MIN_LEVEL_LINE = 363;
  var effectLevel = document.querySelector('.upload-effect-level');
  var effectLevelLine = effectLevel.querySelector('.upload-effect-level-line');

  // вычисление процентного соотношения эффекта
  effectLevelLine.addEventListener('mouseup', function (evt) {

    var levelLineRange = Math.round(((evt.clientX - MIN_LEVEL_LINE) * 100) / (MAX_LEVEL_LINE - MIN_LEVEL_LINE));
    // для тестов
    // console.log('evt.clientX', evt.clientX);
    // console.log(levelLineRangePercent);
    effectLevel.querySelector('.upload-effect-level-value').style.value = levelLineRange;
    effectLevel.querySelector('.upload-effect-level-pin').style.left = levelLineRange + '%';
    effectLevel.querySelector('.upload-effect-level-val').style.width = levelLineRange + '%';
  });

  // Масштаб
  var resizeControls = document.querySelector('.upload-resize-controls');
  var minusButton = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var plusButton = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
  var imagePreview = document.querySelector('.effect-image-preview');

  var resizeControlsSizes = [25, 50, 75, 100];

  minusButton.addEventListener('click', function () {

    var resizeValueNumber = resizeValue.value.slice(0, -1);

    for (var i = resizeControlsSizes.length - 1; i >= 0; i--) {
      if (resizeValueNumber <= resizeControlsSizes[i] && resizeValueNumber >= resizeControlsSizes[i - 1]) {
        resizeValue.value = resizeControlsSizes[i - 1] + '%';
        imagePreview.style.transform = 'scale(' + resizeControlsSizes[i - 1] / 100 + ')';
        // console.log('scale(' + resizeControlsSizes[i - 1] + 'deg)');
        console.log(imagePreview.style.transform);
      }
    }
  });

  plusButton.addEventListener('click', function () {

    var resizeValueNumber = resizeValue.value.slice(0, -1);

    for (var i = 0; i < resizeControlsSizes.length; i++) {
      if (resizeValueNumber >= resizeControlsSizes[i] && resizeValueNumber <= resizeControlsSizes[i + 1]) {
        resizeValue.value = resizeControlsSizes[i + 1] + '%';
        imagePreview.style.transform = 'scale(' + resizeControlsSizes[i + 1] / 100 + ')';
      }
    }
  });

})();
