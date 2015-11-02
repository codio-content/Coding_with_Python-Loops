Let's look at the `for` loop in more detail.

```python
for ctr in range(0, 10):
  total = total + ctr
  print(total)
```

Notce that there are 2 parts to the `for` statement ...

## Initialization
`ctr` 

This is the initialization part where a variable is created to hold the value to update on each iteration.

## Range
`range(0, 10)` is the second section. It defines the start and end values the loop must iterate between. Note that range goes from [0..9], including the first argument, but excluding the last.

## Increment
`range(start, end, increment)` the range function can take a third paramater, the amount to increment the variable by each iteration. If only two paramaters are supplied the variable will be incremented by `1`. Negative numbers can be supplied to loop backwards.
