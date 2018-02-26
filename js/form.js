'use strict';

(function () {
  // форма редактирования изображения
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
      document.removeEventListener('change', onUploadBtnChange);
      uploadFile.addEventListener('change', onUploadBtnChange);
    }
  });

  // открытие поп-апа загрузки изображение
  // скрытие уровня эффекта по умолчанию
  var statusUploaded = function () {
    window.effectLevel.classList.add('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
    window.imagePreview.style.transform = 'scale(' + window.resizeValue.value.slice(0, -1) / 100 + ')';
  };

  // функция закрытия
  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.onPopupEscPress);
  };

})();
