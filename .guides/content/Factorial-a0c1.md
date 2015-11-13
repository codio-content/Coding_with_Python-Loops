X factorial, also written as $X!$ , is $X * (X-1) * (X-2) * (X-3) .... * (1) $.

So, `4!` is `4*3*2*1` = `24`.
{Check It!|assessment}(test-3376902811)

|||guidance
## Solution

```python
# Get N from the command line
import sys
N = int(sys.argv[1])

# Your code goes here
total = 1
for i in range (1, N + 1):
  total = total * i 

print(total)
```

|||

