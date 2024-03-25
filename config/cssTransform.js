// jest.config.js

   // cssTransform.js
module.exports = {
    // this is a synchronous transformer function
    process(src, filename, config, options) {
      // return the transformed source
      return 'module.exports = {};'; // this is just a stub transformation
    },
    // if you had an asynchronous transformation, you'd use `processAsync` instead
    // for example:
    // async processAsync(src, filename, config, options) {
    //   return yourAsyncTransformation(src);
    // },
  };
   