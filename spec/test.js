var idtBeyondApi = require('../lib/idt-beyond');
var nock = require('nock');
var when = require('when');

var url = 'https://api.idtbeyond.com';

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
          idtBeyondApi.initialize({appKey: 'app-key', termId: 'term-id'})
        }).toThrow();
      });

      it("if there in no appKey in the options object", function(){
        expect(function(){
          idtBeyondApi.initialize({appId: 'app-id', termId: 'term-id'})
        }).toThrow();
      });

      it("if there in no termId in the options object", function(){
        expect(function(){
          idtBeyondApi.initialize({appKey: 'app-key', appId: 'app-id'})
        }).toThrow();
      });
    });

    describe('should be successful', function(){
      it("if you pass an options object with both an appId and appKey", function() {
        var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
        expect(idtBeyond).toEqual(jasmine.any(Object));
        expect(idtBeyond.hasOwnProperty('getAppId')).toBe(true);
        expect(idtBeyond.hasOwnProperty('getAppKey')).toBe(true);
        expect(idtBeyond.getAppId()).toBe('app-id');
        expect(idtBeyond.getAppKey()).toBe('app-key');
      });
    });
  });
  describe('Once the object is instantiated', function(){
    describe('should be able to interact with the API', function(){
      describe('getProducts()', function(){
        it("should call /v1/iatu/products/reports/all", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/products/reports/all').reply(200);
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getProducts()).toBe(200);
        });
      });
      describe('getProducts()', function(){
        it("should call /v1/iatu/products/reports/all", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/products/reports/all').reply(200);
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getProducts()).toBe(200);
        });
      });
      describe('validateNumber()', function(){
        it("should call /v1/iatu/number-validator", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/number-validator?country_code=CC&mobile_number=phone-number').reply(when.defer().resolve());
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.validateNumber({countryCode: 'CC', mobileNumber: 'phone-number'})).toBe(200);
        });
      });
      describe('getLocalValue()', function(){
        it("should call /v1/iatu/products/reports/local-value", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get(
                '/v1/iatu/products/reports/local-value?carrier_code=CC&country_code=CC&amount=amount&currency_code=USD')
              .reply(when.defer().resolve(200));
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getLocalValue({countryCode: 'CC', carrierCode: 'CC', amount: 'amount'})).toBe(200);
        });
      });
      describe('postTopup()', function(){
        it("should call /v1/iatu/topups", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .post('/v1/iatu/topups', function(body){
                console.log(body)
                return body.country_code === "CC" && body.carrier_code === "CasdC" &&
                    body.mobile_number === 'phone-number' &&  body.amount === 'amount' &&
                    body.terminal_id === "term-id";
              }).reply(when.defer().resolve(200));
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.postTopup(
              {countryCode: 'CC', carrierCode: 'CC', amount: 'amount', phoneNumber: 'phone-number'})).toBe(200);
        });
      });
    });

  });

});
