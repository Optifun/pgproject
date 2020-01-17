const formatDate = function() {
  console.log(this);
  return (
    this.getFullYear() +
    "-" +
    (this.getMonth() + 1 < 10 ? "0" : "") +
    (this.getMonth() + 1) +
    "-" +
    (this.getDate() < 10 ? "0" : "") +
    this.getDate()
  );
};

const formatTime = function() {
  return (
    (this.getHours() < 10 ? "0" : "") +
    this.getHours() +
    ":" +
    (this.getMinutes() < 10 ? "0" : "") +
    this.getMinutes() //+
    //":" +
    //(this.getSeconds() < 10 ? "0" : "") +
    //this.getSeconds()
  );
};

Date.prototype.today = formatDate;
Date.prototype.timeNow = formatTime;

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime
};
