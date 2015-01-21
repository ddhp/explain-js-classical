'use strict';

/**
 * Goal
 * - MyClass is super class
 * - AnotherClass inherit from MyClass
 * - Inherit methods
 * - Inherit constructor
 * - Overwrite method
 *
 */

function MyClass(param1, param2) {
  var _var1 = param1,
      _var2 = param2,

      _behavior = function () {
        console.log('param1: ', _var1);
      },

      _anotherBehavior = function () {
        console.log('param2: ', param2);
      };
  // this._var1 = _var1;
  // this._var2 = _var2;

  // instance method
  return {
    behavior: _behavior,
    anotherBehavior: _anotherBehavior
  }
}

// this won't add prototype method to MyClass instance
// MyClass.prototype = {
//   method: function () {
//     console.log('prototype method');
//   }
// }

// set prototype as returned object
MyClass.prototype = MyClass();
MyClass.prototype.constructor = MyClass;
//
// MyClass.prototype = {
//   constructor: MyClass
// }
//
// MyClass.prototype.behavior = function () {
//   console.log('param1: ', this._var1);
// }
// MyClass.prototype.anotherBehavior = function () {
//   console.log('param2: ', this._var2);
// }

// MyClass.prototype = new MyClass();
// MyClass.prototype.constructor = MyClass;

// this would do the job
// MyClass.prototype.method = function () {
//     console.log('prototype method');
//   }

var x = new MyClass('param1', 'param2');

function AnotherClass() {
  MyClass.apply(this, arguments);
  // var _behavior = function () {
  //   console.log('overwrited behavior');
  // };
  //
  // return {
  //   behavior: _behavior
  // }
}

AnotherClass.prototype = new MyClass();
// AnotherClass.prototype = MyClass.prototype;
AnotherClass.prototype.constructor = AnotherClass;
AnotherClass.prototype.behavior = function () {
  console.log('overwrited behavior');
}

var y = new AnotherClass('param_a_1', 'param_a_2');


// __extends = function(child, parent) { 
//   for (var key in parent) { 
//     if (__hasProp.call(parent, key)) child[key] = parent[key]; 
//   } 
//   function ctor() { this.constructor = child; } 
//   ctor.prototype = parent.prototype; 
//   child.prototype = new ctor(); 
//   child.__super__ = parent.prototype; 
//   return child; 
// };

// function extendDeep(parent, child) {
//   var i,
//       toStr = Object.prototype.toString,
//       astr = '[object Array]';
//
//   child = child || {};
//
//   for (i in parent) {
//     if (parent.hasOwnProperty(i)) {
//       if (typeof parent[i] === 'object') {
//         child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
//         console.log('call extendDeep with ' + parent[i] + child[i]);
//         extendDeep(parent[i], child[i]);
//       } else {
//         console.log(child, i);
//         child[i] = parent[i];
//       }
//     }
//   }
//   return child
// }
//
// var dad = {
//   counts: [1,2,3],
//   reads: {paper: true}
// }
//
// var kid = extendDeep(dad)
