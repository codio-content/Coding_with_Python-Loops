Let's look at the `for` loop in more detail.

```python
for ctr in range(0, 10):
  total = total + ctr
  output(total)
```

Notce that there are 2 parts to the `for` statement ...

## Initialization
`ctr` 

This is the initialization part where a variable is created to hold the value value update each iteration.

## Range

`range(0, 10)` this is the second section. It defines the start and end values the loop must iterate between.

## Increment
`range(start, end, increment)` the range function can take a third paramater, the amount to increment the variable by each iteration. If only two paramaters are supplied the variable will be incremented by `1`. Negative numbers can be supplied to loop backwards.
