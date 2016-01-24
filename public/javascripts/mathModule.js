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
        
        arr.forEach(function(element, index) {
            if (index % 2) {
                normalDistArr.push(element);
            } else {
                normalDistArr.unshift(element);
            }
        });
        
        propertyToSortTo = null;
        return normalDistArr;
    }
    
    // Code from http://jsfiddle.net/guffa/tvt5k/
    function generateArrayWithNormalDistributedElements(counter) {
        var numbers = [],
            numberOfGeneratedNumbers = 20;
        
        function rnd() {
            return Math.random() - Math.random();
        }
        
        for (var i=0; i<=numberOfGeneratedNumbers; i++) {
            numbers[i] = 0;
        }
        
        for (var i=0; i<counter; i++) {
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