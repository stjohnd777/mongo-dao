module.exports =  function Set(){

    let items = {};

    this.has = function ( value ){
        return items.hasOwnProperty(value);
    };

    this.add = function( item ) {
      if ( !this.has(value)){
          items[value] = value;
          return true;
      }
      return false;
    };

    this.delete = function (value){
        if ( this.has(value)) {
            delete items[value];
            return true;
        }
        return false;
    };

    this.size = function () {
      return Object.keys(items).length;
    };

    this.values = function (){
        let values = [];
        for ( let i =0 , keys=Object.keys(items) ; i < keys.length; i++){
            values.push(items[keys]);
        }
        return values;
    };

    this.clear = function(){
        items = {};
    }

}

let set  = new Set();

set.add('Daniel');
let v1 =  new String("Daniel");
let v2 =  "Daniel";
let v3 =  new String("Daniel");
console.log('has :' + set.has(v1));
console.log('has :' + set.has(v2));
console.log('has :' + set.has('Daniel'));
console.log('has :' + set.has("Daniel"));

console.log( v1 == v2);
// console.log( v1 == v3);console.log( v1 === v3);
console.log( v1 === v2);
