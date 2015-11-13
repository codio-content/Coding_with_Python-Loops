{Check It!|assessment}(test-1027007121)

|||guidance
## Solution
```python
# Get N from the command line
import sys
N = int(sys.argv[1])

# Your code goes here
direction = 0

if N < 0:
  direction = 1  
else:
  direction = -1

while N != 0:
  print(N)
  N = N + direction
```
|||
