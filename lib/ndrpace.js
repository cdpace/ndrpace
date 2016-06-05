module.exports = function () {
    var registry = [];

    this.register = function (entry) {
        if(entry.name == null){
            throw "name is undefined";
        }
        
        if(entry.item == null){
            throw "an item has not been set";
        }
        
        if(entry.type == null){
            entry.type = "reference";
        }
        
        registry.push(entry);
    };
    
    process.loadDependency = function(name){
        
        var obj = {};
        
        registry.forEach(function(entry){
           if(entry["name"] == name){
               
               switch(entry.type.toUpperCase()){
                   case "REFERENCE": {
                        obj = entry["item"];
                        break;        
                   }
                   case "INSTAMCE":{
                       var item = entry["item"]; 
                       obj = new item();
                       break;
                   }
               }
               
           } 
        });
        
        return obj;
    }
    
    
    return this;

};