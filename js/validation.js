'use strict';

(function () {
  var ERROR_COLOR = '#E82C31';
  var DESCRIPTION_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_QUANTITY = 5;
  var form = document.querySelector('.upload-form');
  var inputHashtags = document.querySelector('.upload-form-hashtags');
  var formDescription = document.querySelector('.upload-form-description');

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

  inputHashtags.addEventListener('change', function () {
    var inputData = inputHashtags.value.toLowerCase().trim();
    var resultHashtags = inputData.split(' ');

    var checkHashtags = function () {
      var uniq = {};
      for (var i = 0; i < resultHashtags.length; i++) {

        if (resultHashtags[i].charAt(0) !== '#' && resultHashtags[i].charAt(0).length > 0) {
          inputHashtags.setCustomValidity('Отсутствует знак решетка (#) у хэштега');
          addInputError(inputHashtags);
        } else if (resultHashtags[i].length > HASHTAG_MAX_LENGTH) {
          inputHashtags.setCustomValidity('Максимальная длинна хэштега не должна быть больше ' + HASHTAG_MAX_LENGTH + ' символов');
          addInputError(inputHashtags);
        } else if (uniq.hasOwnProperty(resultHashtags[i])) {
          inputHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.');
          addInputError(inputHashtags);
        } else {
          uniq[resultHashtags[i]] = true;
          inputHashtags.setCustomValidity('');
          removeInputError(inputHashtags);
        }
      }
    };

    if (resultHashtags.length > HASHTAG_QUANTITY) {
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

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function () {
      window.uploadOverlay.classList.add('hidden');
    }, window.errorHandler);
    evt.preventDefault();
  });
})();
