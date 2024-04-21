const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Function convertHandler.getNum(input)', function() {

        test('Whole number input', function(done) {
            let input = '32l';
            assert.equal(convertHandler.getNum(input), 32);
            done();
        });
        test('Decimal input', function(done) {
            let input = '32.3l';
            assert.equal(convertHandler.getNum(input), 32.3);
            done();
        });
        test('Fractional input', function(done) {
            let input = '1/3l';
            assert.equal(convertHandler.getNum(input), 1/3);
            done();
        });
        test('Fraction input w/ Decimal', function(done) {
            let input = '1.2/32l';
            assert.equal(convertHandler.getNum(input), 1.2/32);
            done();
        });
        test('Invalid input (double fracction)', function(done) {
            let input = '1/2/3l';
            assert.equal(convertHandler.getNum(input), undefined);
            done();
        });
        test('No Numerical input', function(done) {
            let input = 'l';
            assert.equal(convertHandler.getNum(input), 1);
            done();
        });
    })
    suite("Function covertHandler.getUnit(input)", function() {
        test("For each valid unit inputs", function(done) {
            let input = [
                "gal",
                "km",
                "l",
                "lbs",
                "mi",
                "kg",
                "GAL",
                "KM",
                "L",
                "LBS",
                "MI",
                "KG"
            ];
            let output = [
                "gal",
                "km",
                "l",
                "lbs",
                "mi",
                "kg",
                "gal",
                "km",
                "l",
                "lbs",
                "mi",
                "kg"
            ];
            input.forEach(function (ele, index) {
                assert.equal(convertHandler.getUnit(ele), output[index]);
            });
            done();
        });
        test("unknown unit inut", function (done) {
            assert.equal(convertHandler.getUnit("34kilograms"), undefined);
            done();
        });
    });
    suite("function converHandler.getRetutnUnit(initUnit)", function () {
        test("For each valid unit inputs", function (done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["l", "gal", "km", "mi", "kg", "lbs"];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });
    });

    suite("Function converHandler.spelOutUnit(unit)", function (){
        test("For each valid unit inputs", function(done) {
            let input = ["gal", "l", "mi", "km", "lbs", "kg"];
            let expect = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
            });
            done();
        });
    });
    suite("function convertHandler.convert(num, unit)", function () {
        test("Gal to L", function (done) {
            let input = [5, "gal"];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
        test("L to gal", function (done) {
            let input = [5, "L"];
            let expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
        test("Mi to km", function (done) {
            let input = [5, "MI"];
            let expected = 8.0467;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
        test("Km to mi", function (done) {
            let input = [5, "KM"];
            let expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
        test("Lbs to kg", function (done) {
            let input = [5, "lbs"];
            let expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
        test("Kg to Lbs", function (done) {
            let input = [5, "kg"];
            let expected = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
            done();
        });
    })
});