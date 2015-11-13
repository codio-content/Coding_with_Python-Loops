The `break` statement is a way of escaping a loop before the loop condition is met.

The `break` statement should never need to be used. Any program that seems to require a break statement can be rewritten to work equally well without it.

Take a look at the code on the left. This shows a loop counting from 0 to 9. However, in our loop we are waiting to see if the loop index hits 7. If it does, we exit the loop immediately.

This is a bit of an artificial example but it illustrates very well how break works. 

{Run the code}(python3 content/4-loops/break.py)
