// DB implemented as array of objects
// An object looks like the following:
/* {
    id, 
    name, 
    quantity, 
    price
}*/
let db = [];

// Creates(inserts) a record into the db
// Returns the error status - false if all ok, true if there is an error
function create(params) {
    let { name, quantity, price } = params;
    // Potentially could have undefined values
    if (!name || !quantity || !price) {
        return true;
    }
    // We store quantity and price as integers
    db.push({
        id: Math.round(Math.random() * 1000),
        name,
        quantity: parseInt(quantity, 10),
        price: parseInt(price, 10)
    });
    return false;
}

// Gets an item / all items from the db
function read(id='') {
    // Potentially want to read everything
    if (id === '') return db;
    return db.find(record => record.id === id);
}

// Deletes a record from the db
// Returns the error status - false if all ok, true if there is an error
function deleteItem(id='') {
    if (id === '') return true;
    db = db.filter(record => record.id !== id);
    return false;
}

// Gets the total warehouse value of the db.
function totalValue() {
    const reducer = (accumulator, currentItem) => 
        accumulator + (currentItem.quantity * currentItem.price);
    return db.reduce(reducer, 0);
}

module.exports = {
    create,
    read,
    deleteItem,
    totalValue
}