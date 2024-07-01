const pe = require("parse-error");

module.exports.ReE = function (res, data, code) {
  // Error Web Response
  let send_data = { success: false };
  if (typeof code !== "undefined") res.statusCode = code;

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }
  return res.json(send_data);
};

module.exports.ReS = function (res, data, code) {
  // Success Web Response
  let send_data = { success: true };

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(send_data);
};

module.exports.TE = TE = function (err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};
