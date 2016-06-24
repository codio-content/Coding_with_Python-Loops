Let's look at the `for` loop in more detail.

```python
7  for ctr in range(0, N +1):  # we use N +1 because range(0,10) = [0..9]
8    total = total + ctr       # increase our total by the loop amount
9    print(str(total))         # output the total as far
```

Notice that there are two parts to the `for` statement ...

## Initialization
`ctr`  is the initialization part. Here a variable is created to hold the value to be updated on each iteration.

## Range
`range(0, N +1)` is the second section. It defines the start and end values the loop must iterate between. Note that range goes from the first number to the last, including the first argument, but excluding the last.

## Increment
`range(start, end, increment)` is the amount to increment the variable by at each iteration. If only two parameters are supplied the variable will be incremented by `1`. Negative numbers can be used to increment, these will loop backwards.
