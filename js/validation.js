'use strict';

(function () {
  var ERROR_COLOR = '#E82C31';
  var DESCRIPTION_MAX_LENGTH = 140;
  var HASHTAG_MAX_LENGTH = 20;
  var HASHTAG_QUANTITY = 5;
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
  });
})();
