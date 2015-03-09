var request = require('request');

var appId, appKey;

var idtBeyondApi = {
    initialize: function(options){
      if (!options || !options.hasOwnProperty('appId') || !options.hasOwnProperty('appKey')){
        throw new Error("Please pass in both appId and appKey to instantiate a new IDT Beyond object.");
      }
      return idtBeyond(options);
    }
};

var idtBeyond = function(options){
  var appId = options.appId;
  var appKey = options.appKey;
  var headers = function(){
    return {
      'x-idt-beyond-app-id': appId,
      'x-idt-beyond-app-key': appKey
    }
  }
  return {
    getAppId: function(){
      return appId;
    },
    getAppKey: function(){
      return appKey;
    }
  }

};


module.exports = idtBeyondApi;

