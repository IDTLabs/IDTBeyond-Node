# IDTBeyond-Node

[![Join the chat at https://gitter.im/IDTLabs/idtbeyond-node](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/IDTLabs/idtbeyond-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Circle CI](https://circleci.com/gh/IDTLabs/IDTBeyond-Node/tree/master.svg?style=svg)](https://circleci.com/gh/IDTLabs/IDTBeyond-Node/tree/master)

[![NPM](https://nodei.co/npm/idtbeyond-node.png?downloads=true)](https://nodei.co/npm/idtbeyond-node/)

The official node package for interacting with the IDT Beyond API.

## Getting started with IDT Beyond

To use this service, sign up for a free account at: [https://portal.idtbeyond.com](https://portal.idtbeyond.com), or read the documentation at [https://portal.idtbeyond.com/docs](https://portal.idtbeyond.com/docs).

## Requirements

- [npm](https://www.npmjs.com/)

## Setup your environment

1. Make sure above requirements are fulfilled. (see site documentation in links above)
2. add this module to your project - **npm install idtbeyond-node --save** 

## Testing

Running `npm test` will run the unit tests with jasmine.

## How to use

### Instantiate the API and then the initialize the class.
``` 
var idtBeyondApi = require('idt-beyond');
var idtBeyond = idtBeyondApi.initialize({
	appId: <your-app-id>,
	appKey: <your-app-key>,
	termId: <"unique terminal name">
	});
```
### Calling the IDT Beyond API using the functions in the class
+ ``` 
+
