'use strict';

(function () {
  var ERROR_COLOR = '#E82C31';
  var DESCRIPTION_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_QUANTITY = 5;


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

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopup();
    }
  };

  uploadOverlay.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      document.removeEventListener('keydown', window.onPopupEscPress);
      // добавил, но почему то не работает, в чем причина?
      document.removeEventListener('change', onUploadBtnChange);
      uploadFile.addEventListener('change', onUploadBtnChange);
    }
  });

  // открытие поп-апа загрузки изображение
  // скрытие уровня эффекта по умолчанию
  var statusUploaded = function () {
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
    imagePreview.style.transform = 'scale(' + resizeValue.value.slice(0, -1) / 100 + ')';
  };

  // функция закрытия
  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.onPopupEscPress);
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
  var inputHashtags = document.querySelector('.upload-form-hashtags');
  var formDescription = document.querySelector('.upload-form-description');


  var addInputError = function (inputName) {
    inputName.style.borderColor = ERROR_COLOR;
    inputName.style.outlineColor = ERROR_COLOR;
  };

  var removeInputError = function (inputName) {
    inputName.style.outlineColor = 'inherit';
    inputName.style.borderColor = 'inherit';
  };

  inputHashtags.addEventListener('change', function () {
    var inputData = inputHashtags.value.toLowerCase().trim();
    var result = inputData.split(' ');

    var checkHashtags = function () {
      var uniq = {};
      for (var t = 0; t < result.length; t++) {

        if (result[t].charAt(0) !== '#' && result[t].charAt(0).length > 0) {
          inputHashtags.setCustomValidity('Отсутствует знак решетка (#) у хэштега');
          addInputError(inputHashtags);
        } else if (result[t].length > HASHTAG_MAX_LENGTH) {
          inputHashtags.setCustomValidity('Максимальная длинна хэштега не должна быть больше ' + HASHTAG_MAX_LENGTH + ' символов');
          addInputError(inputHashtags);
        } else if (uniq.hasOwnProperty(result[t])) {
          inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
          addInputError(inputHashtags);
        } else {
          uniq[result[t]] = true;
          inputHashtags.setCustomValidity('');
          removeInputError(inputHashtags);
        }
      }
    };

    if (result.length > HASHTAG_QUANTITY) {
      inputHashtags.setCustomValidity('Слишком много хэштегов. Используйте не более ' + HASHTAG_QUANTITY + ' к одной фотографии');
      addInputError(inputHashtags);
    } else {
      inputHashtags.setCustomValidity('');
      removeInputError(inputHashtags);
      checkHashtags();
    }


  });

  formDescription.addEventListener('change', function () {
    if (formDescription.value.length > DESCRIPTION_MAX_LENGTH) {
      formDescription.setCustomValidity('Максимальная длинна комментария ' + DESCRIPTION_MAX_LENGTH + ' символов!');
      addInputError(formDescription);
    } else {
      formDescription.setCustomValidity('');
      removeInputError(formDescription);
    }
  });

  buttonSubmitForm.addEventListener('click', function () {
    if (formDescription.validity.valid === false && inputHashtags.validity.valid === false) {
      form.submit();
    }
  }
  );
})();
