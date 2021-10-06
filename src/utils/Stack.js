/**-
 * Stack Data Structur
 *
 * @constructor
 */
module.exports = function Stack(){

    let items = [];

    /**
     * This adds a new item (or several items) to the top of the stack.
     * @param item
     */
    this.push = function(item) {
        items.push(item);
    }
    /**
     * This removes the top item from the stack. It also returns the removed element.
     */
    this.pop = function (){
        return items.pop();
    }

    /**
     * This returns the top element from the stack.
     * The stack is not modified
     * (it does not remove the element; it only returns the element for information purposes).
     */
    this.peek = function (){
        return items[items.length-1];
    }

    /**
     * This returns true if the stack does not contain any elements, and false if the size of the stack is bigger than 0.
     */
    this.isEmpty = function  (){
        return items.length == 0 ;
    }

    /**
     * This returns the number of elements that the stack contains.
     * It is similar to the length property of an array.
     */
    this.size = function (){
        return items.length;
    }

    this.clear == function () {
        items = [];
    }
}

// let stack = new Stack();
// console.log(stack.isEmpty());
// stack.push('hi');
// stack.push('cat');
// console.log(stack.isEmpty());
// console.log(stack.size());
// console.log(stack.peek());
// console.log(stack.pop());
// console.log(stack.peek());

