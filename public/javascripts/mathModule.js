wordCloud.mathModule = (function() {
    var propertyToSortTo = null;
    
    function numberSorterDescending(a, b) {
        if (typeof propertyToSortTo == "string") {
            return b[propertyToSortTo] - a[propertyToSortTo];
        }
        
        return b - a;
    }
    
    function normalDistributionSorter(arr, property) {
        if (!(arr instanceof Array)) {
            throw new Error("Please provide an array.");
        }
        
        if (property !== undefined && !(typeof property == "string")) {
            throw new Error("The property has to be a string");
        }
        
        var normalDistArr = [];
        
        propertyToSortTo = property;
        arr.sort(numberSorterDescending);
        normalDistArr = arr.slice(0); // clone the existing array
        arr.length = 0; // empty the existing array
        
        normalDistArr.forEach(function(element, index) {
            if (index % 2) {
                arr.push(element);
            } else {
                arr.unshift(element);
            }
        });
        
        propertyToSortTo = null;
        return arr;
    }
    
    // Code from http://jsfiddle.net/guffa/tvt5k/
    function generateArrayWithNormalDistributedElements(distributionRate) {
        var numbers = [],
            numberOfGeneratedNumbers = 20;
        
        function rnd() {
            return Math.random() - Math.random();
        }
        
        for (var i=0; i<=numberOfGeneratedNumbers; i++) {
            numbers[i] = 0;
        }
        
        for (var i=0; i<distributionRate; i++) {
            numbers[10 + Math.round(10 * rnd())]++;
        }
        
        return numbers.slice(5, 15);
    }
    
    return {
        normalDistributionSorter: normalDistributionSorter,
        generateArrayWithNormalDistributedElements: generateArrayWithNormalDistributedElements,
        numberSorterDescending: numberSorterDescending  
    }
})();