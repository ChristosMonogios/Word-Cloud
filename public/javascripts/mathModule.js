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
            alert ("provide an array");
            return [];
        }
        
        var normalDistArr = [];
        
        propertyToSortTo = property;
        arr.sort(numberSorterDescending);
        propertyToSortTo = null;
        
        // TODO: check forEach compatibility
        arr.forEach(function(element, index) {
            if (index % 2) {
                normalDistArr.push(element);
            } else {
                normalDistArr.unshift(element);
            }
        });
        
        return normalDistArr;
    }
    
    // Code from http://jsfiddle.net/guffa/tvt5k/
    function generateArrayWithNormalDistributedElements(counter) {
        var numbers = []
        
        function rnd() {
            return Math.random() - Math.random();
        }
        
        for (var i = 0; i <= 20; i++) { // TODO: what to do with 20?
            numbers[i] = 0;
        }
        
        for (var i = 0; i < counter; i++) {
            numbers[10 + Math.round(10 * rnd())]++;
        }
        
        return numbers.slice(5, 15);
    }
    
    return {
        normalDistributionSorter: normalDistributionSorter,
        generateArrayWithNormalDistributedElements: generateArrayWithNormalDistributedElements,        
    }
})();