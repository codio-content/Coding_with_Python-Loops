We have looked at the `while` loop so far. However, we are now going to look at a different loop, which does the same thing, but with a different syntax that may be more convenient for some tasks.

{Run the code}(python3 content/3-loops/for1.py 5)

Take a look at the code on the left. It does the same as the `while` loop code below.

```python
N = int(sys.argv[2]) # Get N from the command line

total = 0  # initialize our total variable
ctr = 0    # this variable is used to count

while ctr <= N:
  total = total + ctr
  ctr = ctr + 1  
  print(total)

print('Final total : ' + str(total))
```
