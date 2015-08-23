(function() {
  'use strict';

  angular.module('app.model').controller('ModelController', ModelController);

  ModelController.$inject = [ 'dataService', 'config' ];

  function ModelController(dataService, config) {
    this._dataService = dataService;
    this._watchers = {};
    this.init(config);
  }

  ModelController.prototype.init = function(config) {
    if (typeof config !== 'undefined' && config !== null) {
      if (typeof config === 'object') {
        for ( var i in config) {
          if (typeof this[i] === 'undefined') {
            this[i] = config[i];
            this._watch(i);
          } else if (typeof this[i] === 'function') {
            this[i].call(this, config[i]);
          }
        }
      }
    }
  };

  ModelController.prototype.get = function(args) {
    if (typeof args === 'object') {
      if (args instanceof Array) {
        for ( var i in args) {
          this.get(args[i]);
        }
        return;
      }
      console.log('getting ' + args.key + '...');
      var paths = args.paths;
      if (paths) {
        var url = '';
        for ( var i in paths) {
          url += '/' + i;
          var path = paths[i];
          if (typeof path !== 'undefined' && path !== null) {
            if (typeof path === 'object') {
              var val = this[path.key];
              if (typeof val === 'undefined') {
                this._watch(path.key, (function() {
                  this.get(args);
                }).bind(this));
                return;
              } else {
                var attr = path.attr;
                if (typeof attr !== 'undefined') {
                  val = val[attr];
                }
                url += '/' + val;
              }
            } else {
              url += '/' + path;
            }
          }
        }
        if (url.length > 0) {
          console.log(url);
          var index = args.index;
          var key = args.key;
          this._dataService.get(url).then(function(data) {
            if (typeof index !== 'undefined') {
              if (data instanceof Array && data.length > 0) {
                data = data[index];
              }
            }
            if (typeof key !== 'undefined') {
              if (typeof this[key] === 'function') {
                this[key].call(this, data);
              } else {
                this[key] = data;
                this._watch(key);
              }
            }
          }.bind(this));
        }
      }
    }
  };

  ModelController.prototype._watch = function(key, fn) {
    if (typeof fn !== 'undefined') {
      console.log('waiting for ' + key + '...');
      if (typeof this._watchers[key] === 'undefined') {
        this._watchers[key] = [];
      }
      this._watchers[key].push(fn);
    } else {
      var fns = this._watchers[key];
      if (fns instanceof Array) {
        console.log('got ' + key + '!');
        for ( var i in fns) {
          fns[i].call();
        }
      }
    }
  };

  ModelController.prototype.exec = function(key, args) {
    console.log('exec ' + key);
    console.log('args ' + args);
    if (typeof this[key] === 'function') {
      this[key].call(key, args);
    } else if (typeof this[key] === 'undefined') {
      this._watch(key, (function() {
        console.log('exec 2 ' + key);
        this.exec(key, args);
      }).bind(this));
    } else {
      console.log(typeof this[key]);
      console.log(this[key]);
      console.log('args ' + args);
      var fn = eval('this.' + key + "=" + this[key]);
      console.log(fn);
      if (typeof fn === 'function') {
        fn.call(this, args);
      }
    }
  };

})();
