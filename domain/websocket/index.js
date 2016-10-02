"use strict";
function authorize(sec, message){
  console.log(sec);
  console.log(message);
  return true;
};

module.exports = {
  authorize : authorize
}
