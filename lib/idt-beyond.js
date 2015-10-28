var request = require('request');
var when = require('when');

var appId, appKey;
var url = 'https://api.idtbeyond.com';
var planType = 'Sandbox';

var idtBeyondApi = {
    initializeIatu: function(options){
      if (!options || !options.hasOwnProperty('appId') || !options.hasOwnProperty('appKey') ||
          !options.hasOwnProperty('termId')){
        throw new Error("Please pass in both appId, appKey and termId to instantiate a new IDT Beyond IATU object.");
      }
      return iatu(options);
    }
};

var iatu = function(options){
  var appId = options.appId;
  var appKey = options.appKey;
  var termId = options.termId;

  var generateClientTransactionId = function(){
    return (appId ? appId.concat('-', ('000000' + Math.floor(Math.random() * (999999 - 1) + 1)).slice(-6)): null);
  };

  var headers = function(){
    return {
      'x-idt-beyond-app-id': appId,
      'x-idt-beyond-app-key': appKey
    }
  };

  return {
    getAppId: function () {
      return appId;
    },
    getAppKey: function () {
      return appKey;
    },
    getProducts: function () {
      var deferred = when.defer();
      request.get({url: url.concat('/v1/iatu/products/reports/all'), headers: headers()}, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    validateNumber: function (params) {
      var deferred = when.defer();
      request.get({
        url: url.concat(
            '/v1/iatu/number-validator?country_code=', params.countryCode, '&mobile_number=', params.phoneNumber),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getLocalValue: function (params) {
      var deferred = when.defer();
      request.get({
        url: url.concat(
            '/v1/iatu/products/reports/local-value?carrier_code=', params.carrierCode, '&country_code=',
            params.countryCode, '&amount=', params.amount, '&currency_code=', params.currencyCode),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    postTopup: function (params) {
      var deferred = when.defer();
      request.post({
        url: url.concat('/v1/iatu/topups'),
        body: {
          'product_code': params.productCode,
          'country_code': params.countryCode,
          'carrier_code': params.carrierCode,
          'mobile_number': params.phoneNumber,
          'plan': planType,
          'amount': params.amount,
          'client_transaction_id': generateClientTransactionId(),
          'terminal_id': termId
        },
        json: true,
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    clientTransactionIdSearch: function (params) {
      var deferred = when.defer();
      request.post({
        url: url.concat('/v1/iatu/topups/reports'),
        body: {
          'type_of_report': 'client_transaction_id',
          'client_transaction_id': params.clientTransactionId,
          'date_from': params.dateFrom,
          'date_to': params.dateTo
        },
        json: true,
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    toServiceNumberSearch: function (params) {
      var deferred = when.defer();
      request.post({
        url: url.concat('/v1/iatu/topups/reports'),
        body: {
          'type_of_report': 'to_service_number',
          'to_service_number': params.toServiceNumber
        },
        json: true,
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    reverseTopup: function (params) {
      var deferred = when.defer();
      request.post({
        url: url.concat('/v1/iatu/topups/reverse'),
        body: {
          'client_transaction_id': params.clientTransactionId,
          'to_service_number': params.toServiceNumber
        },
        json: true,
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getAllTopups: function (params) {
      var deferred = when.defer();
      request.get({
        url: url.concat('/v1/iatu/topups/reports/all?date_from=', params.dateFrom, '&date_to=', params.dateTo),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getAllTopupsTotals: function (params) {
      var deferred = when.defer();
      request.get({
        url: url.concat('/v1/iatu/topups/reports/totals?date_from=', params.dateFrom, '&date_to=', params.dateTo),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getBalance: function () {
      var deferred = when.defer();
      request.get({
        url: url.concat('/v1/iatu/balance'),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getStatus: function () {
      var deferred = when.defer();
      request.get({
        url: url.concat('/v1/status'),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    getAllCharges: function (params) {
      var deferred = when.defer();
      request.get({
        url: url.concat('/v1/iatu/charges/reports/all?date_from=', params.dateFrom, '&date_to=', params.dateTo),
        headers: headers()
      }, function (err, res, data) {
        if (err) {
          deferred.reject(err);
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  };
};

module.exports = idtBeyondApi;

