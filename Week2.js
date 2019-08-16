class Queue {
    // Tail in, head out
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        // if (0 != this.q.length) {
        //     let c = this.q[0];
        //     this.q.splice(0, 1);
        //     return c
        // }

        // if length > 1, executes
        if(this.q.length) {
            return this.q.shift();
        }
    };

    clear() {
        // Clears the queue
        this.q = [];
    };

    addAll(list) {
        this.q = this.q.concat(list);
        // The queue now contains the items provided in the list
    };

    dequeueN(no_of_elements) {
        if (no_of_elements > this.q.length) {
            throw new Error('Index Error: Not enough elements to dequeue!')
        }
        return this.q.splice(0, no_of_elements);
    };

    print() {
        this.q.forEach((element, index) => console.log(`${index}->${element}`))
    }
};
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
// console.log(queue.length);
console.log(queue.q);
console.log(queue.dequeue());
queue.enqueue(33);
console.log(queue.q);
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));

// add a new function that removes all the elements in the queue
queue.clear();
// add a new function that adds set of items into the queue
queue.addAll([3,7,1,9])
// add a function that pops (dequeues) N elements from the queue. The function should reject the input if there is no enough element to be removed.
queue.dequeueN(2); // pop 2 elements
// add a new function that prints the content of the queue with their indexes. The output can be something like:
//     1–>34
//     2–>30
//     3–>11
//     4–>-3
queue.print()