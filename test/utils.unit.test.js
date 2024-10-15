var assert = require('assert');
const { escapeHTML } = require('../utils/escapeHTML');
const { hashpass } = require('../utils/hashHelper');

describe("Perform Utils Test", ()=>{

    it('Should return a the same string given a string', () => {
        assert.equal(escapeHTML("Silicon Valley"),"Silicon Valley");
    });

    it('Should return the different a string with first words in capital letters', () => {
        assert.notEqual(escapeHTML("Silicon Valley"),"Silicon Valley".toLowerCase());
    });
    
    it('Should return a string type, given a html string ', () => {
        assert.equal(typeof (escapeHTML("<Housing/>")), "string");
    });

    it('Should return html string, given a html string', () => {
        assert.notEqual(escapeHTML("<Housing/>"), "<Housing/>");
    });

    it('Escaped string is the same as a given string', () => {
        assert.equal(escapeHTML(""), "");
    });
    
    it('Should return a string type given a string', () => {
        assert.equal(typeof (hashpass("Microsoft")), "string");
    });

})
