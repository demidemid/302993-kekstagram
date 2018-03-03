'use strict';

(function () {
  // форма редактирования изображения
  window.uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = document.querySelector('#upload-file');

  var onUploadBtnChange = function () {
    window.uploadOverlay.classList.remove('hidden');
    openUploadForm();
  };

  // загрузка изображения и показ формы редактирования
  uploadFile.addEventListener('change', onUploadBtnChange);

  // закрытие формы редактирования
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function () {
    window.uploadOverlay.classList.add('hidden');
  });

  // функция закрытия
  var closePopup = function () {
    window.uploadOverlay.classList.add('hidden');
    window.gallery.classList.add('hidden');
    document.removeEventListener('keydown', window.onPopupEscPress);
  };

  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      closePopup();
    }
  };

  window.uploadOverlay.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      document.removeEventListener('keydown', window.onPopupEscPress);
      document.removeEventListener('change', onUploadBtnChange);
      uploadFile.addEventListener('change', onUploadBtnChange);
    }
  });

  // открытие поп-апа загрузки изображение
  var openUploadForm = function () {
    // скрытие уровня эффекта по умолчанию
    window.effectLevel.classList.add('hidden');

    // сбрасываем значения формы при ее открытие
    window.inputHashtags.value = '';
    window.inputHashtags.style.border = '';
    window.formDescription.value = '';
    window.formDescription.style.border = '';
    window.imagePreview.style.filter = 'none';
    document.querySelector('#upload-effect-none').checked = true;
    document.addEventListener('keydown', window.onPopupEscPress);
    window.imagePreview.style.transform = 'scale(' + window.resizeValue.value.slice(0, -1) / 100 + ')';
  };

})();
