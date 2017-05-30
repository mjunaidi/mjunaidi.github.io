(function() {
  'use strict';

  angular.module('app.model').controller('MainController', MainController);

  MainController.$inject = [ 'modelService', 'themeService', 'storageService', '$modal', '$document', '$crypto', '$http', '$scope' ];

  var DEFAULT_KEY = '';
  var ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';

  function MainController(modelService, themeService, storageService, modal, document, crypto, http, scope) {
    this._modelService = modelService;
    this._themeService = themeService;
    this._storageService = storageService;
    this._modal = modal;
    this._document = document;
    this._crypto = crypto;
    this._http = http;
    this._scope = scope;

    this._initHeader();
    this._initBody();
  }

  MainController.prototype._initHeader = function() {
  };

  MainController.prototype._initBody = function() {
    this.key = DEFAULT_KEY;
    this.input = '';
    this.val = "U2FsdGVkX18kfDLR0gaDGKMt+n1NyAeYVk8pYntiyFBTPCzzKMOiGjVFrqYOxMjz";
    this.readData();
  };

  MainController.prototype.readData = function() {
    var path = "../app/pnc/json/data.json";
    var ctrl = this;
    this._http.get(path)
      .success(function (data) {
        ctrl.val = data.value;
      })
      .error(function (data) {
        console.log(data);
      });
  };

  MainController.prototype.encrypt = function() {
    this.result = this._crypto.encrypt(this.input, this.key);
  };

  MainController.prototype.decrypt = function() {
    this.input = this._crypto.decrypt(this.result, this.key);
  };

  MainController.prototype.decryptVal = function() {
    this.val = this._crypto.decrypt(this.val, this.key);
  };

  MainController.prototype.save = function(str) {
    if (typeof str === 'string' && str.trim().length > 0) {
      str = str.trim();
      var exist = false;
      for ( var i in this.saved) {
        var entry = this.saved[i];
        if (entry === str) {
          exist = true;
          break;
        }
      }
      if (exist === false) {
        this.saved.push(str);
        this.set('saved', this.saved);
      }
    }
  };

  MainController.prototype.remove = function(str) {
    if (typeof str === 'number') {
      this.saved.splice(str, 1);
      if (this.saved.length <= 0) {
        this.saved = DEFAULT_LIST;
      }
      this.set('saved', this.saved);
    } else if (typeof str === 'string') {
      var exist = false;
      for ( var i in this.saved) {
        var entry = this.saved[i];
        if (entry === str) {
          this.saved.splice(i, 1);
          exist = true;
          break;
        }
      }
      if (exist === true) {
        if (this.saved.length <= 0) {
          this.saved = _.map(DEFAULT_LIST, _.clone);
        }
        this.set('saved', this.saved);
      }
    }
  };

  MainController.prototype._process = function() {
    this.result = _parse(this.input, ALPHABETS);
  };

  MainController.prototype._reverse = function() {
    this.input = _secret(this.result, ALPHABETS);
  };

  function _parse(str, list) {
    var words = str.split(' ');
    var sentence = '';
    for ( var i in words) {
      var word = words[i];
      var chars = word.split('.');
      var actualWord = '';
      for ( var j in chars) {
        var char = chars[j];
        if (typeof char !== 'undefined' && char.length > 0) {
          var ind = parseInt(char);
          if (ind >= 1 && ind <= 26) {
            ind--;
            var actualChar = list.charAt(ind);
            actualWord += actualChar;
          } else {
            actualWord += '?';
          }
        }
      }
      sentence += actualWord + ' ';
    }
    return sentence.trim();
  }

  function _secret(str, list) {
    var words = str.split(' ');
    var secret = '';
    for ( var i in words) {
      var word = words[i];
      var chars = word.split('');
      var secretWord = '';
      for ( var j in chars) {
        var char = chars[j];
        for ( var a in list) {
          if (char == list[a]) {
            if (secretWord.length > 0) {
              secretWord += '.';
            }
            var secretChar = parseInt(a) + 1;
            secretWord += secretChar;
          }
        }
      }
      secret += secretWord + ' ';
    }
    return secret.trim();
  }

  MainController.prototype.set = function(key, val) {
    this._modelService.set(this, key, val);
  };

  MainController.prototype.store = function(key, val) {
    var storeKey = 'data_' + key;
    this._modelService.watch(this, [ key ], 'store' + key, (function() {
      this._storageService.saveObject(this[key], storeKey);
    }).bind(this));
    var stored = this._storageService.loadObject(storeKey);
    if (typeof stored !== 'undefined' && stored !== null) {
      if (typeof stored.length !== 'undefined' && stored.length > 0) {
        this[key] = stored;
      } else if (typeof stored === 'boolean') {
        this[key] = stored;
      }
    }
    if (typeof this[key] === 'undefined') {
      this[key] = val;
    }
  };

  MainController.prototype.modal = function(args) {
    if (typeof args === 'undefined') {
      args = {};
    }
    if (typeof args === 'object') {
      args.animation = args.animation ? args.animation : true;
      args.size = args.size ? args.size : 'md';
      args.config = args.config ? args.config : null;
    }
    var self = this;
    var modalInstance = this._modal.open({
      animation : args.animation,
      templateUrl : args.templateUrl,
      controller : 'ModalController as ctrl',
      size : args.size,
      resolve : {
        parentCtrl : function() {
          return self;
        },
        config : args.config
      }
    });

    // TODO: this feature to be updated in the future
    modalInstance.result.then(function() {
    }, function() {
    });
  };

  MainController.prototype.links = function(str, links) {
    if (typeof str === 'undefined' || typeof links === 'undefined') {
      return str;
    }
    var template = '<a href="{url}" target="_blank">{label}</a>';
    for ( var i in links) {
      var link = links[i];
      var a = template.replace('{url}', link.url).replace('{label}', link.name);
      str = str.replace(link.name, a);
    }
    return str;
  };

})();
