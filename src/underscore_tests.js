/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(!n) return array[0];
    else return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(!n) return array[array.length-1];
    else return array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for(var i in collection) {
      iterator(collection[i], i, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++) {
      if(array[i] === target) return i;
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    return collection.filter(iterator);
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var rej = [];
    for(var i in collection){
      if(!iterator(collection[i], i, collection))
        rej.push(collection[i]);
    }
    return rej;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = [];
    for(var x in array){
      if(!newArray.includes(array[x]))
        newArray.push(array[x]);
    }
    return newArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    //return array.map(iterator);
    for(var i in array){
      array[i] = iterator(array[i]);
    }
    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArr = [];
    for(var i in array){
      newArr.push(array[i][propertyName]);
    }
    return newArr;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var newList = [];
    if (typeof methodName === 'string'){
      for(var i in list){
        newList.push(list[i][methodName]());
      }
    }
    else {
      for(var i in list){
        newList.push(methodName.call(list[i]))
      }
      // list.forEach(function(value){
      //   newList.push(methodName.call(value));
      // });
    }
    return newList;
  };
  //* _.each = function(iterator) {
  //*   for(var i in this) {
  //*     iterator(args[i], i, this);
  //*   }
  //* };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    var sum = 0;
    if(initialValue) sum = initialValue;
    for(var i in collection){
      sum = iterator(sum, collection[i]);
    }
    return sum;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for(var i in collection){
      if(collection[i] === target) return true;
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(collection.length===0) return true;
    if(!iterator) return true;
    for(var i in collection){
      if(!iterator(collection[i])) return false;
    }
    return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if(collection.length===0) return false;
    if(!iterator) iterator=function(x){ return x;};
    for(var i in collection){
      if(iterator(collection[i])) return true;
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).

  //_.extend = function(obj) {
  //};
  _.extend = function(obj) {
    if(arguments.length < 2) return obj;
    for(var i = 1; i < arguments.length; i++){
      for(var x in arguments[i]){
        obj[x] = arguments[i][x];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if(arguments.length < 2) return obj;
    for(var i = 1; i < arguments.length; i++){
      for(var x in arguments[i]){
        if(!obj.hasOwnProperty(x))
          obj[x] = arguments[i][x];
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var flag = true;
    var value = null;
    return function(){
      if(flag) value = func();
      flag = false;
      return value;};
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var values = {};
    return function(x){
      if(values.hasOwnProperty(x)) return values[x];
      values[x] = func(x);
      return values[x];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for(var i =2; i<arguments.length; i++){
      args.push(arguments[i]);
    }
    window.setTimeout(
      function(){ func.apply(this, args) },
      wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var length = array.length;
    var newArr = [];
    var rand = 0;
    for(var i = 0; i<length; i++){
      rand = Math.floor(Math.random() * array.length);
      newArr.push(array.splice(rand, 1));
    }
    return newArr;
  };

  // Sort an array of objects by a criterion produced by an iterator.
  // If iterator is a string, sort objects by their property that matches the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people objects by their name property.
  _.sortBy = function(collection, iterator) {
    var array = collection.slice();
    var newArr = [];
    var smallest;
    var smallIdx;
    var length = array.length;
    for(var i = 0; i < length; i++){
      smallest = array[0]
      smallIdx = 0;
      for(var j = 1; j < array.length; j++){
        if(typeof iterator === 'function') {
          if(iterator(array[j]) < iterator(smallest) || !smallest){
            smallIdx = j;
            smallest = array[j];
          }
        }
        else {
          if(array[j][iterator] < smallest[iterator] || !smallest){
            smallIdx = j;
            smallest = array[j];
          }
        }
      }
      newArr.push(smallest);
      array.splice(smallIdx, 1);
    }
    return newArr;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var outerArray = [];
    var innerArray = [];
    var length = 0;
    for(var i = 0; i < arguments.length; i++){
      if(arguments[i].length > length) {
        length = arguments[i].length;
      }
    }
    for(var j = 0; j < length; j++){
      innerArray = [];
      for(var k = 0; k < arguments.length; k++){
        innerArray.push(arguments[k][j]);
      }
      outerArray.push(innerArray);
    }
    return outerArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var newArray = [];
    function getValues(x){
      if(typeof x === 'object'){
        getValues(x[0]);
        if(x.length > 1){
          getValues(x.slice(1));
        }
      }
      else {
        newArray.push(x);
      }
    }
    getValues(nestedArray);
    return newArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var subject = arguments[0];
    var newArr = [];
    for(var x in subject){
      var flag = true;
      for(var i = 1; i < arguments.length; i++){
        if(!arguments[i].includes(subject[x])){
          flag = false;
        }
      }
      if(flag) newArr.push(subject[x])
    }
    return newArr;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var subject = arguments[0];
    var newArr = [];
    for(var x in subject){
      var flag = true;
      for(var i = 1; i < arguments.length; i++){
        if(arguments[i].includes(subject[x])){
          flag = false;
        }
      }
      if(flag) newArr.push(subject[x])
    }
    return newArr;
  };

}).call(this);
