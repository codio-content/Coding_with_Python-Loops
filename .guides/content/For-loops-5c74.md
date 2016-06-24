So far you have learned about `while` loops. Now you are going to look at a different loop, which does the same thing, but with a different syntax (structure of statements) that makes it more suitable for particular tasks.

{Run the code}(python3 content/3-loops/for1.py 5)

Have a look at the code on the left. It does the same thing as the `while` loop code written below.

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
