// Infinite datA structures //////////////////////
///////////////////////////////////////////////////
console.log("== Infinite Data structures ==")
type Lazy<T> = () => T
type LazyList<T> = Lazy<{
  head: Lazy<T>,
  tail: LazyList<T>
} | null>

console.log("\n========Lazy List==========\n")

function toList<T>(xs: T[]): LazyList<T> {
  return () => {
    if (xs.length === 0) {
      return null
    } else {
      return {
        head: () => xs[0],
        tail: toList(xs.slice(1))
      }
    }
  }
}

function range(begin: Lazy<number>): LazyList<number> {
  return () => {
    let x = begin()
    return {
      head: () => x,
      tail: range(() => x + 1)
    }
  }
}

function printList<T>(xs: LazyList<T>) {
  let pair = xs()
  while(pair !== null) {
    console.log(pair.head())
    pair = pair.tail()
  }
}

function take<T>(n: Lazy<number>, xs: LazyList<T>): LazyList<T> {
  return () => {
      let m = n()
      let pair = xs()
      if (m > 0 && pair) {
        return {
          head: pair.head,
          tail: take(() => m - 1, pair.tail)
        }
      } else {
          return null
      }
    }
}

printList(take(() => 10, range(() => 3)))

function filter<T>(f: (arg0: T) => boolean, xs: LazyList<T>): LazyList<T> {
  return () => {
    let pair = xs()
    if (pair === null) {
      return null
    } else {
      let x = pair.head()
      if(f(x)) {
        return {
          head: () => x,
          tail: filter(f, pair.tail)
        }
      } else {
        return filter(f, pair.tail)()
      }
    }
  }
}
console.log("\n======= Sieve =========\n")

function sieve(xs: LazyList<number>): LazyList<number> {
  return () => {
    let pair = xs()
    if (pair === null) {
      return null
    } else {
      let y = pair.head()
      return {
        head: () => y,
        tail: sieve(filter((x) => x % y !== 0, pair.tail))
      }
    }
  }
}

let prime = sieve(range(() => 2))

printList(take(() => 10, prime))
