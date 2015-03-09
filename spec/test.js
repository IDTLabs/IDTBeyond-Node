var idtBeyond = require('../lib/idt-beyond');
console.log(JSON.stringify(idtBeyond, null, 2))
//
//describe('JavaScript addition operator', function () {
//  it('adds two numbers together', function () {
//    expect(1 + 2).toEqual(3);
//  });
//});

describe('Create idtBeyond object', function() {
  it("should error if you don't pass both parameters", function() {
    expect(idtBeyond.initialize()).toThrow('Both Application ID (appId) and Application Key (appKey) are required.');
  });
});