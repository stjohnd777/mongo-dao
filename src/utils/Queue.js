/**
 *  Queue Data Structure
 */


class queue {

    constructor() {
        this.items = []
    }

    *items() {
        for(const side of this.items){
            yield side;
        }
    }

    add(item) {
        this.items.push(item)
    }

    next(){
        return this.items.shift()
    }

    isEmpty(){
        return this.items.length == 0;
    }

    peek(){
        return this.isEmpty() ? undefined : this.items[0]
    }
}

module.exports = function Queue(){

    let items = [];

    /**
     * This adds a new item (or several items) at the back of the queue.
     */
    this.enqueue = function( item){
        items.push(item);
    }

    /**
     * This removes the first item from the queue (the item that is in the front of the queue).
     * It also returns the removed element.
     */
    this.dequeue = function(){
        //shift method removes the element that is stored at the index 0 (first position) of the array:
        return items.shift();
    }

    /**
     * This returns the first element from the queue, the first one added,
     * and the first one that will be removed from the queue. The queue is not modified
     * it does not remove the element; it only returns the element for information
     * similar to the peek method from the Stack
     */
    this.front = function (){
        return items[0];
    }

    this.isEmpty = function (){
        return items.length == 0;
    }

}