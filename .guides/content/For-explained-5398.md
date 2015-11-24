Let's look at the `for` loop in more detail.

```python
7  for ctr in range(0, N +1):  # we use N +1 because range(0,10) = [0..9]
8    total = total + ctr       # increase our total by the loop amount
9    print(str(total))         # output the total as far
```

Notce that there are 2 parts to the `for` statement ...

## Initialization
`ctr` 

This is the initialization part where a variable is created to hold the value to update on each iteration.

## Range
`range(0, N +1)` is the second section. It defines the start and end values the loop must iterate between. Note that range goes from the first number to the last, including the first argument, but excluding the last.

## Increment
`range(start, end, increment)` the range function can take a third parameter, the amount to increment the variable by each iteration. If only two parameters are supplied the variable will be incremented by `1`. Negative numbers can be supplied to loop backwards.
