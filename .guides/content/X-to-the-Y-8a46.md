{Check It!|assessment}(test-3599143521)

|||guidance
## Solution
```python
# Get X and Y from the command line
import sys
X= int(sys.argv[1])
Y= int(sys.argv[2])

# Your code goes here
total = 1

if Y == 0:
  print (1)
else:
  for i in range(0, Y):
    total = total * X
  print(total)
```
|||