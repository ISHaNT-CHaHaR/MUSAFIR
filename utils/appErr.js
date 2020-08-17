class appErr extends Error {
   constructor(message, statusCode) {
      super(message);
      (this.statusCode = statusCode),
         (this.status = `${statusCode}`.startsWith('404') ? 'fail' : 'error');
      this.isOperational = true;

      Error.captureStackTrace(this, this.contructor);
   }
}
module.exports = appErr;
