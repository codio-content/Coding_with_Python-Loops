Let's look at this in more detail. Most of it should be very clear to you as it is very close to the Flode chart.

## The while code block
The thing that needs some attention is the `while` statement and its code block.

Every while statement looks like this

```python
while some_condition:
  some_code
  some_more_code
  even_more_code

code carries on executing here 
once 'some_condition' is no longer true
```

What this says is the following. *"While the condition is true, execute all the code statements that come **within** its code block.*

So, it will go round and round until the condition is False. Exactly the same as with the Flode chart.

In our code example, each time the statements in the code block are executed, the `counter` variable is incremented by 1. Eventually, it hits the value 10, at which point the condition is false and any statements after the code block execute.

## Have a play
Feel free to change some of the values in the code and run it again (button below). You can also add more than 1 to `counter` in each loop *iteration* and see what happens.

{Run}(python3 content/1-loops/while.py)
 
Remember, you can reset the code from the **'Settings'** menu at the top. Select the **'Restore current files'** option.