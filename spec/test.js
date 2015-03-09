var idtBeyondApi = require('../lib/idt-beyond');

describe('IDT Beyond API', function() {
  describe('instantiating the object', function(){

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
        var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key'});
        expect(idtBeyond).toEqual(jasmine.any(Object));
        expect(idtBeyond.hasOwnProperty('getAppId')).toBe(true);
        expect(idtBeyond.hasOwnProperty('getAppKey')).toBe(true);
        expect(idtBeyond.getAppId()).toBe('app-id');
        expect(idtBeyond.getAppKey()).toBe('app-key');
      });
    });
  });
  describe('Once the object is instantiated', function(){
    //describe('should be able to interact with the API', function(){
    //  describe('should error', function(){
    //    it("if you call any API endpoints with an invalid appKey/appId", function(done) {
    //      var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key'});
    //      done();
    //      //console.log(products)
    //      //
    //      expect(function(){
    //        idtBeyond.getProducts();
    //        done();
    //      }).tobe({'stuff': "things"})
    //    });
    //  });
    //});

  });

});
