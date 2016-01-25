wordCloud.Binder = (function() {
    var _objBound = null;
    var _binder = null;
    
    function Binder(obj) {
        this.objectCallbacks = {};
        _objBound = obj;
        _binder = this;
        document.addEventListener( "change", this.callbackOnChangeEvent.bind(_objBound), false );
    }
    
    Binder.prototype.subscribe = function(property, callback) {
        this.objectCallbacks[property] = this.objectCallbacks[property] || [];
        this.objectCallbacks[property].push(callback);
    }
    
    Binder.prototype.publish = function(object, property, value) {
        var callbacksLength = this.objectCallbacks[property].length;
        
        for (var i=0; i<callbacksLength; i++) {
            this.objectCallbacks[property][i](object, property, value);
        }
    }
    
    Binder.prototype.callbackOnChangeEvent = function(e) {
        var targetElement = e.target,
            objectAndProperty = targetElement.getAttribute("data-binding"),
            arrWithObjectAndPropertyName = objectAndProperty.match(/[a-zA-Z0-9]+/g);

        if (objectAndProperty) {
            _binder.publish(this, arrWithObjectAndPropertyName[1], targetElement.value);           
        }        
    }

    return Binder;
})();

wordCloud.TwoWayBind = (function(Binder) {
    function TwoWayBind(obj, propName) {
        var binder = new Binder(obj);
        
        // Use a shadow property to avoid RangeError 
        Object.defineProperty(obj, propName, {           
            get: function() {
                return obj["_" + propName];
            },
            set: function(value) {
                if (!(value instanceof TwoWayBind)) {
                    obj["_" + propName] = value;
                    binder.publish(obj, propName, value);                    
                }

            }
        });
        
        binder.subscribe(propName, this.ModelToUI);
        binder.subscribe(propName, this.UIToModel);
    }
    
    TwoWayBind.prototype.ModelToUI = function(object, property, value) {
        var elementsAffected = document.querySelectorAll("[data-binding=" + object.constructor.name + "-" + property + "]"),
            elementType = null;

        for (var i=0; i<elementsAffected.length; i++) {
            elementType = elementsAffected[i].tagName.toLowerCase();

            if ( elementType === "input" || elementType === "textarea" || elementType === "select" ) {
                elementsAffected[i].value = value;
            } else {
                elementsAffected[i].innerHTML = value;
            }
        }
  }
    
    TwoWayBind.prototype.UIToModel = function(obj, property, value) {
        obj["_" + property] = value;
    }
    
    return TwoWayBind;
})(wordCloud.Binder);