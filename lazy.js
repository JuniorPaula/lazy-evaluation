"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
// Introdution lazy evaluation //////////////
////////////////////////////////////////////
function sum(a, b) {
    return a + b;
}
console.log("Eager num:\t", sum(20 + 5, 10));
function lazySum(a, b) {
    return () => a() + b();
}
console.log("lazy sum:\t", lazySum(() => 20 + 5, () => 10)());
// avoiding big computations that are not needed ///
///////////////////////////////////////////////////
console.log("== avoiding big computations that are not needed ==");
console.log("\n===============================================\n");
function hang() {
    return hang();
}
function first(a, b) {
    return a;
}
function lazyFirst(a, b) {
    return a;
}
console.log("first lazy", lazyFirst(() => 10, () => hang())());
// Short-circuit computation //////////////////////
///////////////////////////////////////////////////
console.log("== Short-circuit computation ==");
console.log("\n===========================\n");
console.log("\n============ AND =============\n");
function and(a, b) {
    return () => !a() ? false : b();
}
function trace(x, message) {
    return () => {
        console.log(message);
        return x();
    };
}
console.log("false && false ==", and(trace(() => false, "L"), trace(() => false, "R"))());
console.log("true && fasle ==", and(trace(() => true, "L"), trace(() => false, "R"))());
console.log("true && true ==", and(trace(() => true, "L"), trace(() => true, "R"))());
console.log("false && false ==", and(trace(() => false, "L"), trace(() => true, "R"))());
console.log("\n=========== OR ==============\n");
function or(a, b) {
    return () => a() ? true : b();
}
console.log("false && false ==", or(trace(() => false, "L"), trace(() => false, "R"))());
console.log("true && fasle ==", or(trace(() => true, "L"), trace(() => false, "R"))());
console.log("true && true ==", or(trace(() => true, "L"), trace(() => true, "R"))());
console.log("false && false ==", or(trace(() => false, "L"), trace(() => true, "R"))());
// Infinite datA structures //////////////////////
///////////////////////////////////////////////////
console.log("== Infinite datA structures ==");
console.log("\n============Lazy List==========\n");
function toList(xs) {
    return () => {
        if (xs.length === 0) {
            return null;
        }
        else {
            return {
                head: () => xs[0],
                tail: toList(xs.slice(1))
            };
        }
    };
}
console.log(toList([1, 2, 3]));
console.log(toList([1, 2, 3])());
console.log((_a = toList([1, 2, 3])()) === null || _a === void 0 ? void 0 : _a.head());
console.log((_c = (_b = toList([1, 2, 3])()) === null || _b === void 0 ? void 0 : _b.tail()) === null || _c === void 0 ? void 0 : _c.head());
console.log((_f = (_e = (_d = toList([1, 2, 3])()) === null || _d === void 0 ? void 0 : _d.tail()) === null || _e === void 0 ? void 0 : _e.tail()) === null || _f === void 0 ? void 0 : _f.head());
console.log((_j = (_h = (_g = toList([1, 2, 3])()) === null || _g === void 0 ? void 0 : _g.tail()) === null || _h === void 0 ? void 0 : _h.tail()) === null || _j === void 0 ? void 0 : _j.tail());
function range(begin) {
    return () => {
        let x = begin();
        return {
            head: () => x,
            tail: range(() => x + 1)
        };
    };
}
console.log("------");
console.log(range(() => 3));
console.log(range(() => 3)());
console.log((_k = range(() => 3)()) === null || _k === void 0 ? void 0 : _k.head());
console.log((_m = (_l = range(() => 3)()) === null || _l === void 0 ? void 0 : _l.tail()) === null || _m === void 0 ? void 0 : _m.head());
console.log((_q = (_p = (_o = range(() => 3)()) === null || _o === void 0 ? void 0 : _o.tail()) === null || _p === void 0 ? void 0 : _p.tail()) === null || _q === void 0 ? void 0 : _q.head());
console.log((_u = (_t = (_s = (_r = range(() => 3)()) === null || _r === void 0 ? void 0 : _r.tail()) === null || _s === void 0 ? void 0 : _s.tail()) === null || _t === void 0 ? void 0 : _t.tail()) === null || _u === void 0 ? void 0 : _u.head());
function printList(xs) {
    let pair = xs();
    while (pair !== null) {
        console.log(pair.head());
        pair = pair.tail();
    }
}
console.log("------");
printList(toList([1, 2, 3, 4, 5]));
console.log("------");
function take(n, xs) {
    return () => {
        let m = n();
        let pair = xs();
        if (m > 0 && pair) {
            return {
                head: pair.head,
                tail: take(() => m - 1, pair.tail)
            };
        }
        else {
            return null;
        }
    };
}
printList(take(() => 10, range(() => 3)));
function filter(f, xs) {
    return () => {
        let pair = xs();
        if (pair === null) {
            return null;
        }
        else {
            let x = pair.head();
            if (f(x)) {
                return {
                    head: () => x,
                    tail: filter(f, pair.tail)
                };
            }
            else {
                return filter(f, pair.tail)();
            }
        }
    };
}
console.log("------");
printList(take(() => 10, filter((x) => x % 2 === 0, range(() => 1))));
console.log("\n============ Sieve ==========\n");
function sieve(xs) {
    return () => {
        let pair = xs();
        if (pair === null) {
            return null;
        }
        else {
            let y = pair.head();
            return {
                head: () => y,
                tail: sieve(filter((x) => x % y !== 0, pair.tail))
            };
        }
    };
}
let prime = sieve(range(() => 2));
printList(take(() => 10, prime));
