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

// class defination
function MyClass(param1, param2) {
  this.var1 = param1;
  this.initVar = param2 || 'initVar';
}

// define prototype
MyClass.prototype.behavior = function () {
  console.log('param1: ', this.var1);
}
MyClass.prototype.anotherBehavior = function () {
  console.log('initVar: ', this.initVar);
}

var parent = new MyClass('param1', 'param2');

/**
 * #1 first classical inheritence
 * through assigning prototype
 *
 * cons: can't pass parameters to constructor
 *
 */
console.log('********\n* #1 prototype as new Parent\n********');
(function (c, p) {
 c.prototype = new p();
})(ChildClass, MyClass)

function ChildClass () {};

var child_1 = new ChildClass();
console.log('^ child_1.var1 doesnt exist', child_1.behavior()); // undefined
child_1.anotherBehavior(); // initVar
console.log('child_1 hasOwnProperty initVar: ' + child_1.hasOwnProperty('initVar'), ', means child_1 DOESNT have initBar itself'); // false, initVar belongs to parent class
child_1.var1 = 'child_1';
child_1.behavior(); // child_1
console.log('child_1 has var1 after child_1.var1 = var1');
console.log('new ChildClass with params');
var child_1 = new ChildClass('child_1_param1', 'child_1_param2');
child_1.behavior(); // undefined, b/c child params weren't passed to parent constructor
console.log('child constructor params ARENT passed to parent constructor');

/**
 * #2 second classical inheritence
 * call parent constructor with apply 
 * in child constructor
 *
 * pros: unrelatedly inherit parent varaible setting in constructor
 * cons: prototype not inherited
 *
 */
console.log('\n');
console.log('********\n* #2 call Parent constructor with apply\n********');
function ChildClass2 () {
  MyClass.apply(this, arguments);
};

var child_2 = new ChildClass2('child_2_param1');
try {
  child_2.behavior(); // behavior is not defined
} catch (e) {
  console.error(e.message + ', so prototype is not inherited');
}
console.log('Able to init ChildClass2 with params, var1 = ', child_2.var1);
console.log('child_2 hasOwnProperty(initVar): ', child_2.hasOwnProperty('initVar')); // true, b/c of apply, child2 has initVar itself


/**
 * #3 third classical inheritance
 * mix #1 and #2
 * cons: 
 *   - calls parent constructor twice
 *   - inherit parent instance variable
 *
 */
console.log('\n');
console.log('********\n* #3 mix 1 and 2\n********');
function ChildClass3 () {
  MyClass.apply(this, arguments);
}

ChildClass3.prototype = new MyClass();

var child_3 = new ChildClass3('child_3_param1', 'child_3_param2');
child_3.anotherBehavior(); // child_3_param2, child now inherit prototype, behavior:
delete child_3.initVar;
child_3.anotherBehavior(); // initVar, also inherit parent instance variable

/**
 * #4 Share prototpye
 *
 * cons: 
 *   - modify child protype would affect parent's as well
 *   - doesn't inherit parent instance variable
 *
 */
console.log('\n');
console.log('********\n* #4 share Parent prototype\n********');
function ChildClass4() {
  MyClass.apply(this, arguments);
}

ChildClass4.prototype = MyClass.prototype;
var child_4 = new ChildClass4('child_4_param1', 'child_4_param2');
child_4.behavior(); // child_4_param1
child_4.anotherBehavior(); // child_4_param2

delete child_4.initVar; // undefined
child_4.anotherBehavior(); // undefined
console.log('child_4 DOESNT inherit parent instance variable');

ChildClass4.prototype.behavior = function () {
  console.log('Overwrite child behavior also effect parent\'s');
}
parent.behavior();


/**
 * #5 a proxy function to duplicate parent prototype
 *
 * CAUTION:
 *   - child.constructor is still Parent class
 *   - no reference to Parent constructor
 *
 */
console.log('\n');
console.log('********\n* #5 proxy function to Parent class\n********');
function ChildClass5() {
  MyClass.apply(this, arguments);
}

function ctor() {}
ctor.prototype = MyClass.prototype;
ChildClass5.prototype = new ctor();

var child_5 = new ChildClass5('child_5_param1', 'child_5_param2');
ChildClass5.prototype.behavior = function () {
  console.log('ChildClass5 overwritten');
}

parent.behavior();
child_5.behavior();

console.log('child_5.constructor:', child_5.constructor);

/**
 * #6 Holy Grail  
 *
 * best solution
 *
 */
 console.log('\n');
 console.log('********\n* #6 Holy Grail, Fix cautions of #5\n********');

// inherit function
//
var inherit = (function () {
  return function (child, parent) {
    function ctor() {}
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.__super__ = parent;
    child.prototype.constructor = child;
    return child;
  }
})();

function ChildClass6() {
  this.__super__.apply(this, arguments);
}

inherit(ChildClass6, MyClass);

ChildClass6.prototype.behavior = function () {
  console.log('overwritten by ChildClass6');
}

var child_6 = new ChildClass6('child_6_param1', 'child_6_param2');
parent.behavior();
child_6.behavior();
