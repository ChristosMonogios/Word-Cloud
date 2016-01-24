    QUnit.test("descending order of array with ints after sort", function(assert) {
        var arr = [10, 29, 1, 2, 3, 21, 1, 90];
        
        arr.sort(wordCloud.mathModule.numberSorterDescending);
        
        assert.equal(arr[0], 90, "Value should be 90");
    });
    
    QUnit.test("sort array based on normal distribution", function(assert) {
        var arr = [10, 29, 1, 2, 3, 21, 1, 90, 87];
        
        arr = wordCloud.mathModule.normalDistributionSorter(arr);

        // The value in the middle of the array has to be the highest
        assert.equal(arr[4], 90, "Value should be 90");
    });
    
    QUnit.test("try to sort a string based on normal distribution", function(assert) {
        var str = "this will fail";
        
        raises(function() {
            wordCloud.mathModule.normalDistributionSorter(str)
        }, Error, "Must throw error to pass.");
    });
    
    QUnit.test("try to pass a number as property when doing normal distribution", function(assert) {
        var arr = [{name: "Christos"}, {name: "Max"}];
        
        raises(function() {
            wordCloud.mathModule.normalDistributionSorter(arr, 2)
        }, Error, "Must throw error to pass.");
    });
    
    QUnit.test("sort array with property based on normal distribution", function(assert) {
        var arr = [{age: 30}, {age: 57}];
        
        arr = wordCloud.mathModule.normalDistributionSorter(arr, "age");
        
        assert.equal(arr[0].age, 57, "Age should be 57");
    });

    QUnit.test("generate array with normal distributed numbers", function(assert) {
        var max = 2000;
        
        arr = wordCloud.mathModule.generateArrayWithNormalDistributedElements(max);
        
        assert.equal(arr.length, 10, "length of the array should be 10");
    }); 

    QUnit.test("check if generated array has normal distributed numbers", function(assert) {
        var max = 2000;
        
        arr = wordCloud.mathModule.generateArrayWithNormalDistributedElements(max);
        
        assert.ok(arr[4] > arr[3], "the element in the middle has to be the biggest number");
    });