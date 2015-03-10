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
              .get('/v1/iatu/products/reports/all');
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getProducts().isDone()).toBe(true);
        });
      });

      describe('getProducts()', function(){
        it("should call /v1/iatu/products/reports/all", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/products/reports/all');
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getProducts().isDone()).toBe(true);
        });
      });

      describe('validateNumber()', function(){
        it("should call /v1/iatu/number-validator", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/number-validator?country_code=CC&mobile_number=phone-number');
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.validateNumber({countryCode: 'CC', mobileNumber: 'phone-number'}).isDone()).toBe(true);
        });
      });

      describe('getAllTopupsTotals()', function(){
        it("should call /v1/iatu/topups/reports/totals", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get('/v1/iatu/number-validator?date_from=date-from&date_to=date-to');
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getAllTopupsTotals({dateFrom: 'date-from', dateTo: 'date-to'}).isDone()).toBe(true);
        });
      });

      describe('getLocalValue()', function(){
        it("should call /v1/iatu/products/reports/local-value", function(done) {
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .get(
                '/v1/iatu/products/reports/local-value?carrier_code=CC&country_code=CC&amount=amount&currency_code=USD');
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          done();
          expect(idtBeyond.getLocalValue({countryCode: 'CC', carrierCode: 'CC', amount: 'amount'}).isDone()).toBe(true);
        });
      });

      describe('postTopup()', function(){
        it("should call /v1/iatu/topups", function(done) {
          var deferred = when.defer();
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .post('/v1/iatu/topups', function(body){
                return body.country_code === "CC" && body.carrier_code === "CasdC" &&
                    body.mobile_number === 'phone-number' &&  body.amount === 'amount' &&
                    body.terminal_id === "term-id";
              });
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          deferred.resolve({status: true});
          done();

          expect(idtBeyond.postTopup(
              {countryCode: 'CC', carrierCode: 'CC', amount: 'amount', phoneNumber: 'phone-number'}).isDone()).toBe(true);
        });
      });

      describe('reverseTopup()', function(){
        it("should call /v1/iatu/topups/reverse", function(done) {
          var deferred = when.defer();
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .post('/v1/iatu/topups/reverse', function(body){
                return body.client_transaction_id === "client-transaction-id" &&
                    body.to_service_number === "to-service-number";
              });
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          deferred.resolve({status: true});
          done();

          expect(idtBeyond.reverseTopup(
              {clientTransactionId: 'client-transaction-id', toServiceNumber: 'to-service-number'}).isDone()).toBe(true);
        });
      });

      describe('clientTransactionIdSearch()', function(){
        it("should call /v1/iatu/topups/reports", function(done) {
          var deferred = when.defer();
          var api = nock(url)
              .matchHeader('x-idt-beyond-app-id', 'app-id')
              .matchHeader('x-idt-beyond-app-key', 'app-key')
              .post('/v1/iatu/topups/reports', function(body){
                return body.client_transaction_id === "client-transaction-id" &&
                    body.date_from === "date-from" && body.date_to === 'data-to';
              });
          var idtBeyond = idtBeyondApi.initialize({appId: 'app-id', appKey: 'app-key', termId: 'term-id'});
          deferred.resolve({status: true});
          done();

          expect(idtBeyond.reverseTopup(
              {clientTransactionId: 'client-transaction-id', dateFrom: 'date-from', dataTo: 'date-to'}).isDone())
              .toBe(true);
        });
      });
    });
  });

});
