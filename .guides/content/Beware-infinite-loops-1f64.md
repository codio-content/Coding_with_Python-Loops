Once of the common things that can happen with `while` loops is that you forget to increment your counter.

If, when doing the challenges in this section, you see that nothing happens, the chances are you have created an infinite loop.

Take a look at the code on the left. Can you see what is wrong with it?

If you run this, it will run forever and your program will crash.

The reason is that because you are never incrementing the `counter` variable, the condition is always true (less than 10), so it goes round and round the loop until domesday.

## Run it then fix it
Press the Run button below and you will see you never get anything back. 

So, fix the code by incrementing the counter properly within the loop. You should then see the output. 

{Run the code}(python run-user.py 1-loops/infinite.py)

**Important:** if nothing happens when you press the run button after fixing the code, you may need to go back one page then forward again to re-run it.