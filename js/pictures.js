'use strict';

(function () {


  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  // функция генерирующая рандомное количество лайков
  var getRandomLikes = function (minLikes, maxLikes) {
    return Math.round(minLikes + Math.random() * (maxLikes - minLikes));
  };

  // получаем случайное количество комментариев
  var getRandomCommentsNumber = function (arr) {
    var RandomCommentsNumber = Math.round(Math.random() * arr.length);
    return RandomCommentsNumber;
  };

  // функция которая генерирует массив с объектами
  var getPictures = function () {
    var pictures = [];

    for (var i = 1; i < 26; i++) {
      pictures[i] =
        {
          url: 'photos/' + [i] + '.jpg',
          likes: getRandomLikes(15, 200),
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
  for (var j = 1; j < pictures.length; j++) {
    fragment.appendChild(renderImage(pictures[j]));
  }
  pictureList.appendChild(fragment);

  var gallery = document.querySelector('.gallery-overlay');

  //  заполняем окно данными с первой фотографии
  gallery.querySelector('.gallery-overlay-image').src = pictures[1].url;
  gallery.querySelector('.likes-count').textContent = pictures[1].likes;
  gallery.querySelector('.comments-count').textContent = pictures[1].comments;

  //  делаем видимым окно галереи
  gallery.classList.remove('hidden');

})();
