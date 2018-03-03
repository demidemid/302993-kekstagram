'use strict';

(function () {
  // применение эффекта для изображения
  var PIN_HALF_WIDTH = 9;
  window.effectLevel = document.querySelector('.upload-effect-level');
  window.imagePreview = document.querySelector('.effect-image-preview');
  var sliderElem = window.effectLevel.querySelector('.upload-effect-level-line');
  var pinElement = window.effectLevel.querySelector('.upload-effect-level-pin');
  var pinLevel = window.effectLevel.querySelector('.upload-effect-level-val');
  var sliderValue = document.querySelector('.upload-effect-level-value');

  // функция вычисление получения стиля эффекта из значения ползунка
  var getIntensityLevel = function (level) {
    if (window.imagePreview.classList.contains('effect-chrome')) {
      document.querySelector('.effect-chrome').style.filter = 'grayscale(' + level.toFixed(1) + ')';
    }

    if (window.imagePreview.classList.contains('effect-sepia')) {
      document.querySelector('.effect-sepia').style.filter = 'sepia(' + level.toFixed(1) + ')';
    }

    if (window.imagePreview.classList.contains('effect-marvin')) {
      document.querySelector('.effect-marvin').style.filter = 'invert(' + (level * 100).toFixed(0) + '%)';
    }

    if (window.imagePreview.classList.contains('effect-phobos')) {
      document.querySelector('.effect-phobos').style.filter = 'blur(' + level.toFixed(1) * 3 + 'px)';
    }

    if (window.imagePreview.classList.contains('effect-heat')) {
      document.querySelector('.effect-heat').style.filter = 'brightness(' + level.toFixed(1) * 3 + ')';
    }
  };

  // функция ползунок (количество эффекта)
  pinElement.onmousedown = function (evtDown) {
    var thumbCoords = getCoords(pinElement);
    var shiftX = evtDown.pageX - thumbCoords.left;
    var sliderCoords = getCoords(sliderElem);

    document.onmousemove = function (evtMove) {
      //  вычесть координату родителя, т.к. position: relative
      var newLeft = evtMove.pageX - shiftX - sliderCoords.left;

      // курсор ушёл вне слайдера
      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = sliderElem.offsetWidth - pinElement.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var ratio = Number(newLeft / rightEdge);

      pinElement.style.left = newLeft + PIN_HALF_WIDTH + 'px';
      pinLevel.style.width = (ratio * 100) + '%';
      sliderValue.setAttribute('value', Math.round(ratio * 100));

      getIntensityLevel(ratio);
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false; // отключить начало выбора (изменение курсора)
  };

  pinElement.ondragstart = function () {
    return false;
  };

  var getCoords = function (elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  };

  var effectControls = document.querySelector('.upload-effect-controls');
  var effects = effectControls.querySelectorAll('input[type="radio"]');

  // смена фильтров
  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('click', function (evt) {

      var classList = window.imagePreview.classList;

      for (var j = 0; j < classList.length; j++) {
        if (classList[j] !== 'effect-image-preview') {
          window.imagePreview.classList.remove(classList[j]);
        }
      }

      var effectClass = evt.target.id.substring(7);
      window.imagePreview.classList.add(effectClass);
      // при смене фильтров значение ползунка и уровень прогресса на 100%
      pinElement.style.left = '100%';
      pinLevel.style.width = '100%';

      getIntensityLevel(1);

      // убираем слайдер у оригинальнйо картинки
      if (window.imagePreview.classList.contains('effect-none')) {
        window.effectLevel.classList.add('hidden');
        document.querySelector('.effect-none').style.filter = 'none';
      } else {
        window.effectLevel.classList.remove('hidden');
      }
    });
  }
})();
