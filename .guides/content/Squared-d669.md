{Check It!|assessment}(test-147869595)

|||guidance
## Solution
```python
# Get N from the command line
import sys
N= int(sys.argv[1])

# Your code goes here
total = 0
for i in range(0, N + 1):
  total = total + (i * i)

print(total)
```
|||