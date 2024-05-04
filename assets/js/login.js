const { ipcRenderer } = require('electron');

let username, password, btn;

window.onload = function() 
{
  username = document.getElementById("input-username");
  password = document.getElementById("input-password");
  btn = document.getElementById("btn-submit");

  username.focus();

  btn.onclick = function(event) {
    event.preventDefault();

    const request = {
      username: username.value,
      password: password.value
    };

    ipcRenderer.invoke("login", request);
  };
};