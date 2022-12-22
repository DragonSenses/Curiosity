/* eslint-disable no-undef */
describe("getMaxSubSum(arr)", function() {

    it("[-1, 2, 3, -9] == 5", function() {
      assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
    });
  
    it("[2, -1, 2, 3, -9] == 6", function() {
      assert.equal(getMaxSubSum([2, -1, 2, 3, -9]), 6);
    });
  
    it("[-1, 2, 3, -9, 11] == 11", function() {
        assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
    });

    it("[-2, -1, 1, 2] == 3", function() {
        assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
    });

    it("[100, -9, 2, -3, 5] == 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
    });

    it("[1, 2, 3] == 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
    });

    describe(`If all items are negative, it means that we take none
    (the subarray is empty), so the sum is zero`, function() {
        
        it("[-1, -2, -3] == 0", function() {
            assert.equal(getMaxSubSum([-1, -2, -3]), 0);
        });

    });

    describe(`One element array`, function(){
        it("[1] == 1", function() {
            assert.equal(getMaxSubSum([1]), 1);
        });
    });

    describe(`Entire subarray but negative element in middle`, function(){
        it("[5,4,-1,7,8] == 23", function() {
            assert.equal(getMaxSubSum([5,4,-1,7,8]), 23);
        });
    });

    describe(`Test Case 3: max sum in middle subarray`, function(){
        it("[-2,1,-3,4,-1,2,1,-5,4] == 6", function() {
            assert.equal(getMaxSubSum([-2,1,-3,4,-1,2,1,-5,4]), 6);
        });
    });

    // describe("raises x to power 3", function() {
  
    //     function makeTest(x) {
    //       let expected = x * x * x;
    //       it(`${x} in the power 3 is ${expected}`, function() {
    //         assert.equal(pow(x, 3), expected);
    //       });
    //     }
    
    //     for (let x = 1; x <= 5; x++) {
    //       makeTest(x);
    //     }
    
    //   });
    
    // // ... more tests to follow here, both describe and it can be added
    
    // it("for negative n the result is NaN", function() {
    //   assert.isNaN(pow(2, -1));
    // });
  
    // it("for non-integer n the result is NaN", function() {
    //   assert.isNaN(pow(2, 1.5));
    // });
    
});