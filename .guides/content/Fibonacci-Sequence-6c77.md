The Fibonacci Sequence is the series of numbers:

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

The next number is found by adding up the two numbers before it.

- We start of with 0 and 1
- The first 1 in the above list is found by adding the previous 2 numbers (0+1)
- The 2 is found by adding the two numbers before it (1+1)
- Similarly, the 3 is found by adding the two numbers before it (1+2),
- And the 5 is (2+3)

and so on!

{Check It!|assessment}(test-3185812231)

|||guidance
## Solution
```python
# Get N from the command line
N= sys.argv[2]

# Your code goes here
next = 1
current = 0
fib = 0

for ctr in range(0, N + 1):
  print(fib)
  fib = next + current
  next = current
  current = fib
```
|||