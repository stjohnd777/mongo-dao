/**
 *
 */
module.exports = function PriorityQueue(){
    let items = [];

    function QueueElement(element, priority =1 ){
        this.element = element;
        this.priority = priority;
    }

    /**
     * enqueue the data with priority, by sorting on the priority and inserting in the correct index
     *
     * @param element
     * @param priority
     */
    this.enqueue = function (element, priority) {
        let queueElement = new QueueElement(element, priority);
        let added = false;
        for ( let i = 0; i < items.length;i++){

            if ( queueElement.priority < items[i].priority ){
                items.splice(i,o,queueElement);
                added = true;
                break;
            }
            if( !added){
                items.push(queueElement);
            }
        }
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