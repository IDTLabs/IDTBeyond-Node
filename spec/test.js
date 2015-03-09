var idtBeyondApi = require('../lib/idt-beyond');

describe('Create idtBeyond object', function() {
  describe('should error', function(){
    it("if you don't pass an options object", function() {
      expect(function(){
        idtBeyondApi.initialize()
      }).toThrow();
    });
    it("if there in no appId in the options object", function(){
      expect(function(){
        idtBeyondApi.initialize({appKey: 'app-key'})
      }).toThrow();
    });
  });
  describe('should be successful', function(){
    it("if you pass an options object with both an appId and appKey", function() {
      console.log(idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key'}))
      var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key'});
      expect(idtBeyond).toEqual(jasmine.any(Object));
      expect(idtBeyond.hasOwnProperty('getAppId')).toBe(true);
      expect(idtBeyond.hasOwnProperty('getAppKey')).toBe(true);
      expect(idtBeyond.getAppId()).toBe('app-id');
      expect(idtBeyond.getAppKey()).toBe('app-key');
    });
  });
});
