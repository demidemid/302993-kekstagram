'use strict';

(function () {
  // применение эффекта для изображения
  window.effectLevel = document.querySelector('.upload-effect-level');
  window.imagePreview = document.querySelector('.effect-image-preview');
  var sliderElem = window.effectLevel.querySelector('.upload-effect-level-line');
  var thumbElem = window.effectLevel.querySelector('.upload-effect-level-pin');
  var sliderProgress = window.effectLevel.querySelector('.upload-effect-level-val');
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

      // magicSize or css style
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

      var classList = window.imagePreview.classList;

      for (var j = 0; j < classList.length; j++) {
        if (classList[j] !== 'effect-image-preview') {
          window.imagePreview.classList.remove(classList[j]);
        }
      }

      var effectClass = evt.target.id.substring(7);
      window.imagePreview.classList.add(effectClass);
      // при смене фильтров значение ползунка и прогресса на 100%
      thumbElem.style.left = '100%';
      sliderProgress.style.width = '100%';

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
