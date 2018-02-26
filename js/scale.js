'use strict';

(function () {
  // Масштаб
  var resizeControls = document.querySelector('.upload-resize-controls');
  window.resizeValue = resizeControls.querySelector('.upload-resize-controls-value');
  var minusButton = resizeControls.querySelector('.upload-resize-controls-button-dec');
  var plusButton = resizeControls.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsSizes = [25, 50, 75, 100];

  minusButton.addEventListener('click', function () {
    var resizeValueNumber = window.resizeValue.value.slice(0, -1);

    for (var i = resizeControlsSizes.length - 1; i >= 0; i--) {
      if (resizeValueNumber <= resizeControlsSizes[i] && resizeValueNumber >= resizeControlsSizes[i - 1]) {
        window.resizeValue.value = resizeControlsSizes[i - 1] + '%';
        window.imagePreview.style.transform = 'scale(' + resizeControlsSizes[i - 1] / 100 + ')';
      }
    }
  });

  plusButton.addEventListener('click', function () {
    var resizeValueNumber = window.resizeValue.value.slice(0, -1);

    for (var j = 0; j < resizeControlsSizes.length; j++) {
      if (resizeValueNumber >= resizeControlsSizes[j] && resizeValueNumber <= resizeControlsSizes[j + 1]) {
        window.resizeValue.value = resizeControlsSizes[j + 1] + '%';
        window.imagePreview.style.transform = 'scale(' + resizeControlsSizes[j + 1] / 100 + ')';
      }
    }
  });
})();
