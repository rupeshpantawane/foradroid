var os = require("os");
const APP = require("../config/app.json");

var hostname = os.hostname();
var env;
var port;
var wallet_base_url;

if (hostname == "PratikMalewar" || hostname == "DESKTOP-8O3VJHU"
  || hostname == "iloma-HP-Notebook"
  || hostname == "LAPTOP-6JILN4C9" || hostname == "amol-Lenovo-ideapad-110-15ISK"
  || hostname == "DESKTOP-B63KABN"
  || hostname == "DESKTOP-UK9GCE1"
  || hostname == "DELL") {
    env = "production";
    port = APP.production.PORT;
    base_url = APP.production.BASE_URL;
    req_base_url = APP.production.REQ_BASE_URL;
    wallet_base_url = APP.production.WALLET_BASE_URL
    fcm_server_key = APP.production.FCM_SERVER_KEY
 
} else {
  console.log(APP.test.PORT)
  env = "test";
  port = APP.test.PORT;
  base_url = APP.test.BASE_URL;
  req_base_url = APP.test.REQ_BASE_URL;
  wallet_base_url = APP.test.WALLET_BASE_URL
  fcm_server_key = APP.test.FCM_SERVER_KEY
}

const app = {
  env: env,
  port: port,
  base_url: base_url,
  req_base_url: req_base_url,
  wallet_base_url: wallet_base_url,
  fcm_server_key: fcm_server_key
};

module.exports = app;
