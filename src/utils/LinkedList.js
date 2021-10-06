module.exports = function LinkedList() {

    let Node = function (element) {
        this.element = element;
        this.next = null;
    };

    function InBounds(position) {
        return position > -1 && position < length;
    }

    let length = 0;
    let head = null;
    let current = null;

    /**
     * This adds a new item to the end of the list.
     * @param element
     */
    this.append = function (element) {

        let node = new Node(element);
        if (head == null) {
            head = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            length++;
        }
    };
    /**
     * This inserts a new item at a specified position in the list.
     * if success true true otherwise false
     * @param position
     * @param element
     */
    this.insert = function (position, element) {

        if (!(position >= 0 && position <= length)) {
            return false;
        }

        let node = new Node(element);
        if (position === 0) {
            node.next = current;
            head = node;
        } else {

            let index = 0;
            let previous = null;
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            node.next = current;
            previous.next = node;
        }
        length++;
        return true;
    };
    /**
     * This removes an item from the list.
     * @param element
     */
    this.remove = function (element) {
    }


    /**
     * remove element at specified position and return value
     * @param element
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
     */
    this.removeAt = function (position) {
        if (!InBounds(position)) {
            return null;
        }

        let current = head;
        let previous = null;
        let index = 0;

        if (position === 0) {
            head = current.next;
        } else {
            while (index++ < position) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        length--;
        return current.element;

    };

    /**
     * This returns the index of the element in the list. If the element is not in the list, it returns -1.
     */
    this.indexOf(element)
    {
        let current = head;
        let index = -1;
        while ( current){
            if ( element === current.element){
                return index;
            }
            index ++;
            current = current.next;
        }
        return -1;
    }

    this.removeAt = function (position) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    };

};
    this.remove = function (element) {


    };
    this.indexOf = function (element) {
    };
    /**
     * This returns the number of elements the linked list contains. It is similar to the length property of the array.
     */
    this.size = function () {

    }
    this.isEmpty = function () {
    };

}