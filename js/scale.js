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

    for (var m = resizeControlsSizes.length - 1; m >= 0; m--) {
      if (resizeValueNumber <= resizeControlsSizes[m] && resizeValueNumber >= resizeControlsSizes[m - 1]) {
        window.resizeValue.value = resizeControlsSizes[m - 1] + '%';
        window.imagePreview.style.transform = 'scale(' + resizeControlsSizes[m - 1] / 100 + ')';
      }
    }
  });

  plusButton.addEventListener('click', function () {
    var resizeValueNumber = window.resizeValue.value.slice(0, -1);

    for (var a = 0; a < resizeControlsSizes.length; a++) {
      if (resizeValueNumber >= resizeControlsSizes[a] && resizeValueNumber <= resizeControlsSizes[a + 1]) {
        window.resizeValue.value = resizeControlsSizes[a + 1] + '%';
        window.imagePreview.style.transform = 'scale(' + resizeControlsSizes[a + 1] / 100 + ')';
      }
    }
  });
})();
