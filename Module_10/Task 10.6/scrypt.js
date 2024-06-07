const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.getElementById("output");
const btnOpen = document.querySelector('.j-btn-open');
const btnClose = document.querySelector('.j-btn-close');
const btnSend = document.querySelector('.j-btn-send');
const UserText = document.getElementById("usertext").value;
const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.j-btn-test');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnOpen.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen('<b>' + "Соединение установлено" + '</b>');
  };
  websocket.onclose = function(evt) {
    writeToScreen('<b>' + "Соединение разорвано" + '</b>');
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">Ответ: ' + document.getElementById("usertext").value+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

btnClose.addEventListener('click', () => {
  websocket.close();
  websocket = null;
});

btnSend.addEventListener('click', () => {
  const message = 'Test message';
  writeToScreen("Сообщение: " + document.getElementById("usertext").value);
  websocket.send(message);
});



const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
