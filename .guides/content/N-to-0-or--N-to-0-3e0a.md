Test your code here first {Run}(python3 run-user.py 0-N-0.py)

{Check It!|assessment}(test-1027007121)

|||guidance
## Solution
```python
input0 = input0(6)
direction = 0

if input0 < 0:
  direction = 1  
else:
  direction = -1

while input0 != 0:
  output(input0)
  input0 = input0 + direction
```
|||
