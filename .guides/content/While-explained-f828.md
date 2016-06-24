Have a look at the code in more detail. It should be fairly easy to understand as it is very similar to the Flode chart. 

## The while code block
Have a look at the `while` statement and it's code block.

Every while statement looks like this:

```python
while some_condition:
  some_code
  some_more_code
  even_more_code

code carries on executing here 
once 'some_condition' is no longer true
```

What this says is the following. *"While the condition is true, execute all the code statements that occur **inside** its code block.*

So, the loop will go round and round until the condition is false. Exactly the same as with the Flode chart.

In the code example, each time the statements in the code block are executed, the `counter` variable is incremented by one. Eventually, it hits the value `10`, at which point the condition becomes false and any statements after the code block execute.

## Have a play
Feel free to change some of the values in the code and run it again using the button below. You can also add more than 1 to `counter` in each loop *iteration* and see what happens.

{Run}(python3 content/1-loops/while.py)
 
Remember, if you want to, you can reset the code from the 'Settings' menu at the top. To do this, select the 'Reset Chapter' option.