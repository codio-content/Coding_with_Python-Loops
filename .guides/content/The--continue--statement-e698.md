The `continue` statement is used to jump over one iteration and continue the loop from the top.

The example on the left shows a loop that skips displaying the loop counter if it is an odd number.

Like `break` on the previous page, `continue` can make it difficult to follow the program logic. In this case, the logic of the `if` statement could have been changed to make the program easier to understand.
```python
for i in range(0, 10):
  if i % 2 == 0:
    print(i)

print('Finished.')
```

{Run the code}(python3 content/4-loops/continue.py)
