'use strict';

var APARTMENT_OPTIONS = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = [' Королевский дворец', ' Однушка в Чертаново', ' Загородный дом', ' Супер-пупер бунгало'];
var CHECKIN_TIME = ['12.00', '13.00', '14.00'];
var CHECKOUT_TIME = ['12.00', '13.00', '14.00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OPTIONS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_ADS = 8;
var GUESTS = [1, 2, 3];
var ROOMS = [1, 2, 3];
var PRICES = [10000, 20000, 30000, 40000, 50000];


// Удаление класса map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Элементы на странице для отображения объявлений
var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin')
    .content.querySelector('.map__pin');

// Функция получения рандомных чисел в определенном диапозоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// Функция создания элементов из массива со случайным выбором элементов
var getRandomArrElem = function (array) {
  return array.slice(0, getRandomNumber(0, array.length));
};

// Функция для выбора случайного количество элементов из массив
function getRandomNumOfElemFromArr(arr) {
  var elements = [];
  for (var i = 0; i < getRandomNumber(1, arr.length - 1); i++) {
    var option = getRandomArrElem(arr);
    if (elements.indexOf(option) === -1) {
      elements.push(option);
    }
  }
  return elements;
}

// Функция для генерирования данных(моки)
function generateMocks(counter) {
  var mocksList = [];
  for (var i = 0; i < counter; i++) {
    var locationX = getRandomNumber(0, mapPins.clientWidth);
    var locationY = getRandomNumber(130, 630);
    var mocksPins = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': getRandomArrElem(TITLES),
        'address': locationX + ' ' + locationY,
        'price': getRandomArrElem(PRICES),
        'type': getRandomArrElem(APARTMENT_OPTIONS),
        'rooms': getRandomNumber(1, ROOMS.length - 1),
        'guests': getRandomNumber(1, GUESTS.length - 1),
        'checkin': getRandomArrElem(CHECKIN_TIME),
        'checkout': getRandomArrElem(CHECKOUT_TIME),
        'features': getRandomNumOfElemFromArr(FEATURES),
        'description': getRandomArrElem(APARTMENT_OPTIONS),
        'photos': getRandomNumOfElemFromArr(PHOTOS_OPTIONS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      }
    };
    mocksList.push(mocksPins);
  }
  return mocksList;
}

// На основе данных, полученных из функции generateMocks, клону шаблона pinElement задаем метки координат и изображений
function getPinTemplate(data) {
  var pinElement = templatePin.cloneNode(true);
  var pinIcon = pinElement.querySelector('img');
  pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;' + ' transform: translate(-50%, -100%)';
  pinIcon.src = data.author.avatar;
  pinIcon.alt = data.offer.title;
  return pinElement;
}

// Функция для рендеринга пинов на карте
function renderPins(pinsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(getPinTemplate(pinsData[i]));
  }
  mapPins.appendChild(fragment);
}

renderPins(generateMocks(NUMBER_ADS));
