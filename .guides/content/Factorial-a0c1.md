X factorial, also written as $X!$ , is $X * (X-1) * (X-2) * (X-3) .... * (1) $.

So, `4!` is `4*3*2*1` = `24`.

{Run the code}(python3 run-user.py factorial.py)

{Check It!|assessment}(test-3376902811)

|||guidance
## Solution

```python
input0 = input0(4)
total = 1

for i in range (1, input0 + 1):
  total = total * i 

output(total)
```

|||

