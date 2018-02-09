'use strict';

(function () {

  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // функция генерирующая рандомное количество лайков
  var getRandomLikes = function () {
    return Math.round(MIN_LIKES + Math.random() * (MAX_LIKES - MIN_LIKES));
  };

  // получаем случайное количество комментариев
  var getRandomCommentsNumber = function (arr) {
    var RandomCommentsNumber = Math.round(Math.random() * arr.length);
    return RandomCommentsNumber;
  };

  // функция которая генерирует массив с объектами
  var getPictures = function () {
    var pictures = [];

    for (var i = 0; i < 26; i++) {
      pictures[i] =
        {
          url: 'photos/' + [i + 1] + '.jpg',
          likes: getRandomLikes(),
          comments: getRandomCommentsNumber(COMMENTS),
        };
    }
    return pictures;
  };

  var pictures = getPictures();
  var pictureList = document.querySelector('.pictures');

  var renderImage = function (picture) {

    var pictureTemplate = document.querySelector('#picture-template').content;
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments;

    return pictureElement;
  };


  //  создаем фрагмент
  var fragment = document.createDocumentFragment();

  //  и воспроизводим шаблоны с помощью фрагмента
  for (var j = 0; j < pictures.length; j++) {
    fragment.appendChild(renderImage(pictures[j]));
  }
  pictureList.appendChild(fragment);

  //  делаем видимым окно галереи
  var gallery = document.querySelector('.gallery-overlay');
  gallery.classList.remove('hidden');

  //  заполняем окно данными с первой фотографии
  gallery.querySelector('.gallery-overlay-image').src = pictures[0].url;
  gallery.querySelector('.likes-count').textContent = pictures[0].likes;
  gallery.querySelector('.comments-count').textContent = pictures[0].comments;

}());
