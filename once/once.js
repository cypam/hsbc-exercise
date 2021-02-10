const once = (callback) => {
    let memo = undefined;
    return (...args) => {
        if(memo === undefined) {
            memo = callback(...args);
        }
        return memo
    }
};

function add(a, b) { return a + b; };

function minus(a,b) {return a-b}

const onceAdd = once(add); 


console.log(onceAdd(1, 2)); 
console.log(onceAdd(2, 2)); 
console.log(onceAdd(2, 3)); 

const onceMinus = once(minus);

console.log(onceMinus(1, 1)); 
console.log(onceMinus(2, 2)); 
console.log(onceMinus(2, 3)); 