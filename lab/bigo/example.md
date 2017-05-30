# Introduction to Big O Notation (5 mins)
Big O notation is a unit to measure computer program complexity; for example how long it will take to run. For measuring time complexity, it depends on the size of input.

## How does it depends on input size?
Take below function for example;
```java
boolean linearSearch(List<String> list, String keyword) {
    for (String item : list)
        if (item.equals(keyword))
            return true;
    return false;
}
```
* If `keyword` happens to be in the beginning of the `list`, then the function will return `true` almost immediately.
* If `keyword` not in `list`, then it will have to examine everything from the list. Taking the number of steps which is equal to the size of the input.

## Measuring the basic steps taken
Let's count the number of steps taken.
### Example 1: Search a string in a list
```java
boolean linearSearch(List<String> list, String keyword) {
    for (String item : list)
        if (item.equals(keyword))
            return true;
    return false;
}
```
Say `n` is the size of the input, and in the worst case;
* `for (String item : list) if (item.equals(keyword))` --- `2*n` steps (`1` for assignment and `1` for the `if` statement in the loop)
* `return false;` --- `1` step (for return)

In the end, we have: `2*n + 1`.

### Example 2: Finding max integer in an array
Let's take another example:
```java
boolean max(int[] numbers) {
    int max = 0;
    for (int num : numbers)
        if (num > max)
            max = num;
    return max;
}
```
Say `n` is the size of the input, in the worst case where the list contains a sorted integers;
* `int max = 0;` - `1` step (for assignment)
* `for (int num : numbers) if (num > max) max = num;` --- `3*n` steps (`1` for assignment, `1` for test, and `1` for another assignment)
* `return max;` --- `1` step (for return)

In the end, we have: `1 + 3*n + 1` = `3*n + 2`.

## Converting it to Big O notation
Big O notation only focus on the size of the input and mostly concern with the worst case scenario. Let's take previous examples and also a few others, and convert them to the Big O notation by using these rules:  
1. If running time is sum of multiple terms, keep one with the largest growth rate. 
2. If remaining term is a product, drop any multiplicative constants.

### Example 1
`2*n + 1` becomes `O(n)`.  
The steps:  
* `2*n` - removed `+1` because following rule (1); if running time is sum of multiple terms, keep one with the largest growth rate. In this case it's `2*n`.
* `n` - removed `2*` because following rule (2); if remaining term is a product, drop any multiplicative constants. In this case it's `2*`.
* Therefore, in the end we left with `n`, and in Big O notation, `O(n)`.

### Example 2
`3*n + 2` becomes `O(n)`.  
The steps:
* `3*n` --- removed `+2`because following rule (1)  keep one with the largest growth rate.
* `n` --- removed `3*` because following rule (2) drop any multiplicative constants.  
* Therefore, `3*n + 2` in Big O notation, `O(n)`.

### Example 3
```java
  int[][] multiples(int[] arr) {
    int[][] m = new int[arr.length][];
    for (int i = 0; i < arr.length; i++) {
      m[i] = new int[arr.length];
      for (int j = 0; j < arr.length; j++) {
        m[i][j] = arr[i] * arr[j];
      }
    }
    return m;
  }
```
Since this function has nested loops, it is going to be a little bit different. To calculate the steps, we begin from operations inside the inner loop:
* `m[i][j] = arr[i] * arr[j];` ---  `2` steps (`+1` for arithmetic operation, another `+1` for assignment).
* Since this happens inside a loop, we have to multiply it by `n`, becomes `2*n`.
* `for (int j = 0; j < arr.length; j++)` --- `3*n + 1` steps (`+1`for initial assignment `int j = 0`, `3*n`: `1` for test `j < arr.length`, `2` for `j++`; since this is actually `j=j+1`, `1` for arithmetic operation, another `1` for assignment)
* Sum up all the inner loop steps, we have `2*n + 3*n + 1` = `5*n + 1`.
* This is an inner loop, so we have to multiply it by `n`, becomes `5*n^2 + n`.
* Operation inside outer loop, `m[i] = new int[arr.length];` --- `n` (for assignment; `1` step multiply by `n`, because inside a loop).
* And the outer loop, `for (int i = 0; i < arr.length; i++)` --- `3*n + 1` steps (_see above_).
* Sum up all terms in outer loop without the inner loop, `3*n + 1 + n` = `4*n + 1`.
* Sum up the outer and the inner loop terms, `5*n^2 + n + 4*n + 1` = `5*n^2 + 5*n + 1`
* In Big O notation; rule (1) keep one with the largest growth rate: `5*n^2`.
* Rule (2) drop any multiplicative constants: `n^2`.
* So it's `O(n^2)`.

## Types of complexity
**O(1)** --- constant running time.  
**O(log n)** --- logarithmic running time (i.e: binary search, bi-section search).  
**O(n)** --- linear running time.  
**O(n log n)** --- log-linear running time (i.e: merge sort)  
**O(n^c)** --- polynomial running time (normally when having nested loops). This includes **O(n^2)** which is called quadratic complexity (i.e: insertion sort).
**O(c^n)** --- exponential running time (c is a constant being raised to a power based on size of input). This includes **O(n^n)**.
> Higher position denotes better time complexity than the lower position.

## Why use Big O notation?
Big O notation helps us measure complexity. We can use it to compare algorithms, code optimization, predict performance of a program and many more. Besides time complexity, Big O notation is also used to measure space complexity (or memory usage) which is not in the scope of this article.