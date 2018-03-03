'use strict';

(function () {
  var ERROR_COLOR = '#E82C31';
  var DESCRIPTION_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_QUANTITY = 5;
  var form = document.querySelector('.upload-form');
  window.inputHashtags = document.querySelector('.upload-form-hashtags');
  window.formDescription = document.querySelector('.upload-form-description');

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255, 0, 0, .8);';
    node.style.position = 'fixed';
    node.style.display = 'flex';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    node.style.height = '50px';
    node.style.width = '50%';
    node.style.transform = 'translateX(-50%)';
    node.style.top = '0';
    node.style.left = '50%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    // закрытие сообщение об ошибке через 3000мс (3 секунды)
    setTimeout(function () {
      node.style.display = 'none';
    }, 3000);
  };


  var addInputError = function (inputName) {
    inputName.style.borderColor = ERROR_COLOR;
    inputName.style.outlineColor = ERROR_COLOR;
  };

  var removeInputError = function (inputName) {
    inputName.style.outlineColor = 'inherit';
    inputName.style.borderColor = 'inherit';
  };

  window.inputHashtags.addEventListener('change', function () {
    var inputData = window.inputHashtags.value.toLowerCase().trim();
    var resultHashtags = inputData.split(' ');

    var checkHashtags = function () {
      var uniq = {};
      for (var i = 0; i < resultHashtags.length; i++) {

        if (resultHashtags[i].charAt(0) !== '#' && resultHashtags[i].charAt(0).length > 0) {
          window.inputHashtags.setCustomValidity('Отсутствует знак решетка (#) у хэштега');
          addInputError(window.inputHashtags);
        } else if (resultHashtags[i].length > HASHTAG_MAX_LENGTH) {
          window.inputHashtags.setCustomValidity('Максимальная длинна хэштега не должна быть больше ' + HASHTAG_MAX_LENGTH + ' символов');
          addInputError(window.inputHashtags);
        } else if (uniq.hasOwnProperty(resultHashtags[i])) {
          window.inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
          addInputError(window.inputHashtags);
        } else {
          uniq[resultHashtags[i]] = true;
          window.inputHashtags.setCustomValidity('');
          removeInputError(window.inputHashtags);
        }
      }
    };

    if (resultHashtags.length > HASHTAG_QUANTITY) {
      window.inputHashtags.setCustomValidity('Слишком много хэштегов. Используйте не более ' + HASHTAG_QUANTITY + ' к одной фотографии');
      addInputError(window.inputHashtags);
    } else {
      window.inputHashtags.setCustomValidity('');
      removeInputError(window.inputHashtags);
      checkHashtags();
    }
  });

  window.formDescription.addEventListener('change', function () {
    if (window.formDescription.value.length > DESCRIPTION_MAX_LENGTH) {
      window.formDescription.setCustomValidity('Максимальная длинна комментария ' + DESCRIPTION_MAX_LENGTH + ' символов!');
      addInputError(window.formDescription);
    } else {
      window.formDescription.setCustomValidity('');
      removeInputError(window.formDescription);
    }
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      window.uploadOverlay.classList.add('hidden');
    }, window.errorHandler);
    evt.preventDefault();
  });
})();
