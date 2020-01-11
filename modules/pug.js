const pug = require("pug");

const pugCompile = (data = {}) => (path, opts = {}) => {
    const compile = pug.compileFile(path);
    return compile({ ...opts, ...data });
  };
  
  module.exports = {
    pugCompile: pugCompile(),
    pug: pugCompile()
  };