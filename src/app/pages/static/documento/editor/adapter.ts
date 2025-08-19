export default class Adapter {
    loader;
    reader;
    config;
    constructor(loader, config) {
      this.loader = loader;
      this.config = config;
    }
  
    upload() {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = function () {
          resolve({ default: reader.result });
        };
  
        reader.onerror = function (error) {
          reject(error);
        };
  
        reader.onabort = function () {
          reject();
        };
  
        reader.readAsDataURL(this.loader.file);
      });
    }
  
    abort() {
      if (this.reader) {
        this.reader.abort();
      }
    }
  }
  
  