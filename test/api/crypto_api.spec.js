let api = require("../../src/api/crypto/crypto_api"),
    expect = require('chai').expect,
    should = require('chai').should();

describe("crypto tests", function(){

    it ( "it should hash" ,()=>{
        let m = "Test is not working as designed or is it?"
        let h = api.Hash(m);
        expect(h).to.not.be.undefined;
    })

    it ( "it should hash match text to hash" , async ()=>{
        let m = "Test is not working as designed or is it?"
        let h = await api.Hash(m);
        expect(h).to.not.be.undefined;
        let isEq =  await api.DoesTestHashTo(h,m);
        expect(isEq).to.be.true;
    })

    it ( "it should Encrypt/Decrypt AES" ,()=>{
        let algo = 'AES';
        let m = "Test is not working as designed or is it?"
        console.log(m);
        let cipher = api.Encrypt(m);
        console.log(cipher,algo);
        let msg = api.Decrypt(cipher,algo);
        expect(msg).to.be.eq(m);

    })

    it ( "it should Encrypt/Decrypt DES" ,()=>{
        let algo = 'DES'
        let m = "Test is not working as designed or is it?"
        console.log(m);
        let cipher = api.Encrypt(m,algo);
        console.log(cipher);
        let msg = api.Decrypt(cipher,algo);
        console.log(msg);
        expect(msg).to.be.eq(m);
    })


    it ( "it should Encrypt/Decrypt TripleDES" ,()=>{
        let algo = 'TripleDES'
        let m = "Test is not working as designed or is it?"
        console.log(m);
        let cipher = api.Encrypt(m,algo);
        console.log(cipher,algo);
        let msg = api.Decrypt(cipher,algo);
        expect(msg).to.be.eq(m);
    })


    it ( "it should Encrypt/Decypt Rabbit" ,()=>{
        let algo = 'Rabbit'
        let m = "Test is not working as designed or is it?"
        console.log(m);
        let cipher = api.Encrypt(m,algo);
        console.log(cipher,algo);
        let msg = api.Decrypt(cipher,algo);
        expect(msg).to.be.eq(m);
    })

    it ( "it should Encrypt/Decrypt RC$" ,()=>{
        let algo = 'RC4'
        let m = "Test is not working as designed or is it?"
        console.log(m);
        let cipher = api.Encrypt(m,algo);
        console.log(cipher,algo);
        let msg = api.Decrypt(cipher,algo);
        expect(msg).to.be.eq(m);
    })



});