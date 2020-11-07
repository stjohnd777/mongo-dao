let assert = require('assert')

describe("Hello Test", function (){

    it ("should pass" , function(){
            assert.equal(true,true);
    })

    it ("should fail" , function(){
        assert.equal(true,false);
    })
});