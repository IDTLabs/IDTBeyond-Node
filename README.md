# SDK for JavaScript in Node.js

[![Join the chat at https://gitter.im/IDTLabs/idtbeyond-node](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IDTLabs/idtbeyond-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Circle CI](https://circleci.com/gh/IDTLabs/IDTBeyond-Node/tree/master.svg?style=svg)](https://circleci.com/gh/IDTLabs/IDTBeyond-Node/tree/master)

[![NPM](https://nodei.co/npm/idtbeyond.png?downloads=true)](https://nodei.co/npm/idtbeyond/)

The official node package for interacting with the IDT Beyond API.

## Getting started with IDT Beyond

To use this service, sign up for a free account at: [https://portal.idtbeyond.com](https://portal.idtbeyond.com), or read the documentation at [https://portal.idtbeyond.com/docs](https://portal.idtbeyond.com/docs).

## Requirements

- [npm](https://www.npmjs.com/)

## Setup your environment

1. Make sure above requirements are fulfilled. (see site documentation in links above)
2. add this module to your project - **npm install idtbeyond --save** 

## Testing

Running `npm test` will run the unit tests with jasmine.


## Using the IDTBeyond Node.js module
	
> Include the IDTBeyond library: 

```javascript
var idtBeyondApi = require('idtbeyond');
```

<aside class="notice">
Each application has a unique `appID` and `appKey`. You can generate up to 5 keys per application, and they can be regenerated by you at any time. Make sure to use the correct ones, and update your code when new valid keys are generated.
</aside>

> Initialize the variable with your `appID` and `appKey` information:

```javascript
var idtBeyondIatu = idtBeyondApi.initializeIatu(
	{
		appId: '<your-app-id>',
		appKey: '<your-app-key>', 
		termId: '<your-unique-term-id>'
	}
);
```

__The calls defined below require that the initialization of the idtBeyond object have been completed.__  

### API Status -

This returns the status of the IDT Beyond API.

**Request:**

```javascript
idtBeyondIatu.getStatus().then(function(result){ ... });
```

*The **result** variable inside the then method's callback will containd
the promise's result*


**Response:**

```json
{
   "alive":true
}
```

## Get all products
This endpoint retrieves a current list of products offered by our IATU API.

**Request:**

```javascript
idtBeyond.getProducts().then(function(products){ ... });
```
*The **products** variable inside the then method's callback will containd
the promise's result*
**Response:**

```json
[
   {
      "country":"Guatemala",
      "countryCode":"GT",
      "carrier":"Tigo",
      "carrierCode":"Tigo",
      "mask":"502-XXXX-XXXX",
      "denomination":700,
      "minDenomination":700,
      "maxDenomination":700,
      "commission":"10"
   },
   {
      "country":"Argentina",
      "countryCode":"AR",
      "carrier":"Movistar",
      "carrierCode":"Movistar",
      "mask":"54-XXXX-XXX-XXXX",
      "denomination":700,
      "minDenomination":700,
      "maxDenomination":700,
      "commission":"14.50"
   }
]
``` 


## Local Value
Get the local value of a particular product.

**Request:**

```javascript
idtBeyond.getLocalValue({carrierCode: 'Claro', countryCode: 'GT', amount: 500, currecncyCode: 'USD'}).then(function(result){ ... });
```
*The **result** variable inside the then method's callback will containd
the promise's result*

**Response:**

```json
{	
	"carrier_code":"Claro",
	"country_code":"GT",
	"amount":"500",
	"currency_code":"USD",
	"local_currency":"GTQ",
	"local_amount":"3965",
	"divisor":"100"
}
```


####Body Parameters

Parameter | Required | Class | Content-type | Description
--------- | ------- | ----- | -------| -----------
countryCode | true | string | application/json | 2-digit code of the country in ISO 3166 format. Ex: CO for Columbia.
carrierCode | true | string | application/json | Name of the mobile carrier. Ex: Tigo
currencyCode | true | string | application/json | The currency code (ISO 4217) on the product you are querying. Ex: USD
amount | true | integer | application/json | The amount of the product you would like to get the value of. Ex: 1000 = $10.00 (in cents).


## Balance
This call allows you get the balance on a specific application. 

**Request:**

```javascript
idtBeyond.getBalance().done(function(results) { ... });
```
*The **results** variable inside the then method's callback will containd
the promise's result*

**Response:**

```json
{
   "balance":986834,
   "currency_code":"USD",
   "currency_symbol":"$",
   "currency_divisor":100
}
```

## Topup

This is how you topup a phone in another country.
**Request:**

```javascript
PLACE CODE HERE
```

**Response:**

```json
{
   "success":true,
   "client_transaction_id":"trans_id_12345",
   "transaction_id":"3114555",
   "amount":500,
   "currency_divisor":"100",
   "currency_symbol":"$",
   "wholesaler_balance":0,
   "wholesaler_commission":100,
   "local_amount":3965,
   "local_currency":"GTQ",
   "local_divisor":"100",
   "plan":"Sandbox",
   "terminal_id":"test curl",
   "carrier_code":"Claro",
   "country_code":"GT",
   "country_name":"Guatemala",
   "mobile_number":50212345678,
   "to_service_number":"01036819223",
   "from_service_number":"9999999999"
}
```

####Body Parameters

Parameter | Required | Class | Type | Description
--------- | ------- | ---- | ---------- | -----------
countryCode | true | string | application/json | 2-digit code of the country in ISO 3166 format. (Ex: **GT** for Guatemala).
carrierCode | true | string | application/json | Name of the mobile carrier. (Ex: **Claro**).
amount | true | integer | application/json | This is the amount, in cents, of the product you are purchasing. (Ex: **500** = $5.00).
mobileNumber | true | integer | application/json | Mobile number to topup. VALIDATE prior to submission. (Ex: **50312345678**).
carrierCode | true | string | application/json | Name of the mobile carrier. (Ex: **Claro**).
plan | true | string | application/json | The Application plan being used: **Sandbox** or **Production**
clientTransactionId | true | string | application/json | A __unique__ id you use to track topups (Limit of 20 characters)
terminalId | false | string | application/json | __Optional__ ID for the Terminal used to perform the topup

<aside class="notice">
On a POST, the `Content-type` is `application/json`, and the parameters are contained in the body.
</aside>

##Topups Reports (all)

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
{
   "success":true,
   "totals":{
      "purchases":"0",
      "transfers":"-500",
      "commissions":"100",
      "transactions_count":"1",
      "actual_last_transaction_date":"2015-01-05T22:44:35",
      "query_start_date":"2015-01-05",
      "query_end_date":"2015-01-05"
   },
   "transactions":[
      {
         "mobile_phone_number":"50212345678",
         "production_pin":"0000000001",
         "client_transaction_id":"Trans246",
         "currency_code":"US",
         "currency_symbol":"$",
         "currency_divisor":"100",
         "transaction_date":"2015-01-05T22:44:34",
         "transaction_method":"XFER",
         "transaction_description":"IMTU",
         "transaction_amount":"-500",
         "retail_amount":"-500",
         "retail_commission":"100",
         "account_start_balance":"60575",
         "account_end_balance":"60175",
         "product_name":"IMTU - CLARO UNIVERSAL $5"
      }
   ]
}
```

This will return both the totals report, and the transactions during the dates requested.

### Endpoint:

`GET /v1/iatu/topups/reports/all`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)

####Query String Parameters

Parameter | Required | Type | Description
--------- | ------- | ----- | -----------
dateFrom | true | query | YYYY-MM-DD format. Starts at 00:00:00 Eastern Time (ET). (Ex: 2015-12-01).
dateTo | true | query | YYYY-MM-DD format. Ends at 23:59:59 Eastern Time (ET). (Ex: 2015-12-01).

<aside class="notice">
Query strings follow the URL with the `?`, and  are strung together with the `&` symbol.
</aside>

<aside class="success">
Remember — All date_to and date_from queries are in Eastern Time (ET), by default.
</aside>


##Topups Reports (Totals)

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
{
   "success":true,
   "totals":{
      "from_service_number":"133333333",
      "sales":"50000",
      "cost":"40000",
      "commissions":"10000",
      "transactions_count":"100",
      "actual_last_transaction_date":"2015-01-02T23:59:59",
      "query_start_date":"2015-01-01",
      "query_end_date":"2015-01-02",
      "currency_code":"US",
      "currency_symbol":"$",
      "currency_divisor":"100"
   }
}
```

This returns a report of topups totals, within a given time period, 

### Endpoint

`GET /v1/iatu/topups/reports/totals`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)

####Query String Parameters

Parameter | Required | Type | Description
--------- | ------- | ----- | -----------
dateFrom | true | query | YYYY-MM-DD format. Starts at 00:00:00 Eastern Time (ET). (Ex: 2015-12-01).
dateTo | true | query | YYYY-MM-DD format. Ends at 23:59:59 Eastern Time (ET). (Ex: 2015-12-01).

<aside class="notice">
Query strings follow the URL with the `?`, and are strung together with the `&` symbol.
</aside>

<aside class="success">
Remember — All date_to and date_from queries are in Eastern Time (ET), by default.
</aside>

##Topups Reports (Search)

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
{
   "success":true,
   "transaction_data":[
      {
         "currency_code":"USD",
         "currency_symbol":"$",
         "currency_divisor":"100",
         "client_transaction_id":"transaction246",
         "transaction_date":"2/2/2015 10:57:04 AM",
         "description":"Success",
         "commission":"100",
         "type":"IMTU - CLARO UNIVERSAL $5",
         "end_balance":"56915",
         "amount":"-500",
         "terminal_id":"this term is cool",
         "transaction_status":"Success",
         "to_service_number":"1177741290"
      }
   ]
}
```
Use this endpoint to search for the status of a particular topup transaction, using the unique **customer_transaction_id** you supplied in the request.

### Endpoint

`POST /v1/iatu/topups/reports`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)


####Body Parameters

Parameter | Required | Class | Type | Description
--------- | ------- | ----- | ----- | -----------
typeOfReport | true | string | application/json | The field we are using to track this transaction by. (Ex. **client_transaction_id**).
dateFrom | true | string | application/json | YYYY-MM-DD format. Starts at 00:00:00 Eastern Time (ET). (Ex: **2015-12-01**).
dateTo | true | string | application/json | YYYY-MM-DD format. Ends at 23:59:59 Eastern Time (ET). (Ex: **2015-12-01**).
clientTransactionId | true | string | application/json | A unique id you use to track topups (Limit of 20 characters).

<aside class="notice">
On a POST, the `Content-type` is `application/json`, and the parameters are contained in the body.
</aside>

<aside class="success">
Remember — All date_to and date_from queries are in Eastern Time (ET), by default.
</aside>

##Topups (Reverse)

Occasionally, a carrier will not be able to successfully complete a topup request. In this case, we will attempt to automatically reverse the transaction for you, and return the money into your account. In the case when this is not possible, you may need to request a reverse on the transaction that has a status of **"transaction_status": "notredeemed"**.

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
{
   "success":true,
   "account_id":"12345678",
   "client_transaction_id":"RollMeBackPlease-rev",
   "transaction_id":"111222333",
   "to_service_number":"0777948847",
   "remaining_amount":0,
   "currency_symbol":"$",
   "currency_divisor":"100"
}
```
Use this endpoint to search for the status of a particular topup transaction, using the unique **customer_transaction_id** you supplied in the request, and use the **"to_service_number"**.

### Endpoint

`POST /v1/iatu/topups/reports`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)


####Body Parameters

Parameter | Required | Class | Type | Description
--------- | ------- | ----- | -------- | -----------
clientTransactionId | true | string | application/json | A unique id you use to track topups (Limit of 16 characters).
toServiceNumber | true | string | application/json | The service number of the financial transaction (moving the money between your balance and the carrier).

<aside class="notice">
On a POST, the `Content-type` is `application/json`, and the parameters are contained in the body.
</aside>


## Charges Reports (all)

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
[
   {
      "account_id":"12345678",
      "amount":"100000",
      "currency_code":"USD",
      "currency_symbol":"$",
      "currency_divisor":"100",
      "date":"2015-01-16 03:13:09",
      "start_balance":"0",
      "end_balance":"100000",
      "service_number":"03333333333",
      "transaction_id":"111222333",
      "type":"Credit"
   }
]
```
Returns a list of any credit card charges, wire-transfers, or credit adjustments on your application account.

### Endpoint

`GET /v1/iatu/charges/reports/all`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)


####Query String Parameters

Parameter | Required | Type | Description
--------- | ------- | ----- | -----------
dateFrom | true | query | YYYY-MM-DD format. Starts at 00:00:00 Eastern Time (ET). (Ex: 2015-12-01).
dateTo | true | query | YYYY-MM-DD format. Ends at 23:59:59 Eastern Time (ET). (Ex: 2015-12-01).

<aside class="notice">
Query strings follow the URL with the `?`, and are strung together with the `&` symbol.
</aside>

<aside class="success">
Remember — All date_to and date_from queries are in Eastern Time (ET), by default.
</aside>

##Number Validator

> Request:

```javascript
PLACE CODE HERE
```

> Response:

```json
{
   "country_code":"BR",
   "mobile_number":"5521983339000",
   "valid":true
}
```
Use this tool to verify that a number uses the correct area code and number of digits for the selected country.

### Endpoint

`GET /v1/iatu/number-validator`

####Headers

Parameter | Required | Type | Description
--------- | ------- | ---- | -----------
x-idt-beyond-app-id | true | header | The ID of the application you would like to use. __Use:__ `x-idt-beyond-app-id: APP-ID` (__Ex:__ If your APP-ID is 3456c92, **x-idt-beyond-app-id: 3456c92**)
x-idt-beyond-app-key | true | header | One of the valid keys for the application you would like to use. __Use:__ `x-idt-beyond-app-key: APP-KEY` (__Ex:__ If your APP-KEY is abcd1234efgh56789ijkl, **x-idt-beyond-app-key: abcd1234efgh56789ijkl**)

####Query String Parameters

Parameter | Required | Type | Description
--------- | ------- | ------------ | -----------
countryCode | true | query | 2-digit code of the country in ISO 3166 format. (Ex: **BR** for Brazil).
mobileNumber | true | query | Mobile number to topup. VALIDATE prior to submission. (Ex: **5521983339000**).

<aside class="success">
The number validation tool is automatically used when submitting a topup request.
</aside>
>>>>>>> Stashed changes
