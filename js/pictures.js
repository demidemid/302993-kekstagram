'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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
  var gallery = document.querySelector('.gallery-overlay');

  // и воспроизводим шаблоны с помощью фрагмента
  for (var j = 1; j < pictures.length; j++) {
    fragment.appendChild(renderImage(pictures[j]));
  }

  pictureList.appendChild(fragment);

  // ------------------------- Открытие картинки по клику на превью -------------------- //

  var picture = document.querySelectorAll('.picture');
  var closeButton = document.querySelector('.gallery-overlay-close');

  var onCloseButtonClick = function () {
    gallery.classList.add('hidden');
  };

  var onPicturePrewiewClick = function () {
    gallery.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  closeButton.addEventListener('click', function () {
    onCloseButtonClick();
    document.removeEventListener('keydown', onPopupEscPress);
  });

  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
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

  // ----------------------- форма редактирования изображения ---------------------- //
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');

  var onUploadBtnChange = function () {
    uploadOverlay.classList.remove('hidden');
    statusUploaded();
  };

  // загрузка изображения и показ формы редактирования

  uploadFile.addEventListener('change', onUploadBtnChange);

  // закрытие формы редактирования
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function () {
    uploadOverlay.classList.add('hidden');
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  uploadOverlay.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.removeEventListener('keydown', onPopupEscPress);
      // добавил, но почему то не работает, в чем причина?
      document.removeEventListener('change', onUploadBtnChange);
      uploadFile.addEventListener('change', onUploadBtnChange);
    }
  });

  // открытие поп-апа загрузки изображение
  // скрытие уровня эффекта по умолчанию
  var statusUploaded = function () {
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    imagePreview.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
  };

  // функция закрытия
  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // применение эффекта для изображения
  var effectLevel = document.querySelector('.upload-effect-level');
  var sliderElem = effectLevel.querySelector('.upload-effect-level-line');
  var thumbElem = effectLevel.querySelector('.upload-effect-level-pin');
  var sliderProgress = effectLevel.querySelector('.upload-effect-level-val');
  var sliderValue = document.querySelector('.upload-effect-level-value');
  var imagePreview = document.querySelector('.effect-image-preview');

  // функция вычисление получения стиля эффекта из значения ползунка
  var getIntensityLevel = function (level) {
    if (imagePreview.classList.contains('effect-chrome')) {
      document.querySelector('.effect-chrome').style.filter = 'grayscale(' + level.toFixed(1) + ')';
    }

    if (imagePreview.classList.contains('effect-sepia')) {
      document.querySelector('.effect-sepia').style.filter = 'sepia(' + level.toFixed(1) + ')';
    }

    if (imagePreview.classList.contains('effect-marvin')) {
      document.querySelector('.effect-marvin').style.filter = 'invert(' + (level * 100).toFixed(0) + '%)';
    }

    if (imagePreview.classList.contains('effect-phobos')) {
      document.querySelector('.effect-phobos').style.filter = 'blur(' + level.toFixed(1) * 3 + 'px)';
    }

    if (imagePreview.classList.contains('effect-heat')) {
      document.querySelector('.effect-heat').style.filter = 'brightness(' + level.toFixed(1) * 3 + ')';
    }
  };

  // функция ползунок (количество эффекта)
  thumbElem.onmousedown = function (e) {
    var thumbCoords = getCoords(thumbElem);
    var shiftX = e.pageX - thumbCoords.left;
    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (evt) {
      //  вычесть координату родителя, т.к. position: relative
      var newLeft = evt.pageX - shiftX - sliderCoords.left;

      // курсор ушёл вне слайдера
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      // magicSize or css style?
      var thumbElemHalfWidth = 9;
      var ratio = Number(newLeft / rightEdge);

      thumbElem.style.left = newLeft + thumbElemHalfWidth + 'px';
      sliderProgress.style.width = (ratio * 100) + '%';
      sliderValue.setAttribute('value', Math.round(ratio * 100));

      getIntensityLevel(ratio);
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false; // disable selection start (cursor change)
  };

  thumbElem.ondragstart = function () {
    return false;
  };

  function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }

  var effectControls = document.querySelector('.upload-effect-controls');
  var effect = effectControls.querySelectorAll('input[type="radio"]');

  // смена фильтров
  for (var i = 0; i < effect.length; i++) {
    effect[i].addEventListener('click', function (evt) {

      var classList = imagePreview.classList;

      for (var l = 0; l < classList.length; l++) {
        if (classList[l] !== 'effect-image-preview') {
          imagePreview.classList.remove(classList[l]);
        }
      }

      var effectClass = evt.target.id.substring(7);
      imagePreview.classList.add(effectClass);
      // при смене фильтров значение ползунка и прогресса на 100%
      thumbElem.style.left = 100 + '%';
      sliderProgress.style.width = 100 + '%';

      getIntensityLevel(1);

      // убираем слайдер у оригинальнйо картинки
      if (imagePreview.classList.contains('effect-none')) {
        effectLevel.classList.add('hidden');
        document.querySelector('.effect-none').style.filter = 'none';
      } else {
        effectLevel.classList.remove('hidden');
      }
    });
  }

  // Масштаб
  var resizeControls = document.querySelector('.upload-resize-controls');
  var minusButton = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var plusButton = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
  var resizeControlsSizes = [25, 50, 75, 100];

  minusButton.addEventListener('click', function () {
    var resizeValueNumber = resizeValue.value.slice(0, -1);

    for (var m = resizeControlsSizes.length - 1; m >= 0; m--) {
      if (resizeValueNumber <= resizeControlsSizes[m] && resizeValueNumber >= resizeControlsSizes[m - 1]) {
        resizeValue.value = resizeControlsSizes[m - 1] + '%';
        imagePreview.style.transform = 'scale(' + resizeControlsSizes[m - 1] / 100 + ')';
      }
    }
  });

  plusButton.addEventListener('click', function () {
    var resizeValueNumber = resizeValue.value.slice(0, -1);

    for (var a = 0; a < resizeControlsSizes.length; a++) {
      if (resizeValueNumber >= resizeControlsSizes[a] && resizeValueNumber <= resizeControlsSizes[a + 1]) {
        resizeValue.value = resizeControlsSizes[a + 1] + '%';
        imagePreview.style.transform = 'scale(' + resizeControlsSizes[a + 1] / 100 + ')';
      }
    }
  });

  // Хэш-тэги
  var form = document.querySelector('.upload-form');
  var buttonSubmitForm = document.querySelector('.upload-form-submit');
  var formDescription = document.querySelector('.upload-form-description');

  function getDataFromInput() {
    var inputHashtags = document.querySelector('.upload-form-hashtags');
    var inputData = inputHashtags.value;

    var tagsArr = inputData.split(' ');
    var result = [];

    for (var t = 0; t < tagsArr.length; t++) {
      var lowerCase = tagsArr[t].toLowerCase();

      if (result.indexOf(lowerCase) !== -1) {
        inputHashtags.setCustomValidity('дубль');
      } else {
        inputHashtags.setCustomValidity('');
      }

      if (tagsArr[t].length) {
        result.push(tagsArr[t].toLowerCase());
      }
    }

    if (result.length > 5) {
      inputHashtags.setCustomValidity('слишком много хэштегов');
    } else {
      inputHashtags.setCustomValidity('');
    }

    for (var r = 0; r < result.length; r++) {
      if (result[r].charAt(0) !== '#') {
        inputHashtags.setCustomValidity('отсутствует знак решетка (#) у хэштега');
      } else {
        inputHashtags.setCustomValidity('');
      }

      if (result[r].length > 20) {
        console.log('ghbbbbbbbbbbbbbbbbbdtn');
        inputHashtags.valid = true;
        inputHashtags.setCustomValidity('максимальная длинна хэштега не должна быть больше 20 символов');
        console.log('ghbbbbbbbbbbbbbbbbbdtn', inputHashtags.valid);
      } else {
        inputHashtags.setCustomValidity('');
      }
    }

    if (formDescription.validity.tooLong === true) {
      formDescription.setCustomValidity('Вы ввели больше, чем 140 символов');
    } else {
      formDescription.setCustomValidity(''); // Has to be an empty string
    }

    if (result.length > 5) {
      inputHashtags.setCustomValidity('слишком много хэштегов');
    } else {
      inputHashtags.setCustomValidity('');
    }

    if (formDescription.valid === false && inputHashtags.valid === false) {
      form.submit();
    }

  }

  buttonSubmitForm.addEventListener('click', function () {
    // evtSubmitForm.preventDefault();
    getDataFromInput();
  }
  );

})();


