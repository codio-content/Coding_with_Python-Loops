X factorial, also written as $X!$ , is $X * (X-1) * (X-2) * (X-3) .... * (1) $.

So, `4!` is `4*3*2*1` = `24`.

{Run the code}(node run-user.js factorial.js)

{Check It!|assessment}(test-3376902811)

|||guidance
## Solution

```javascript
input0 = 4

for ( i=1, total=1 ; i <= input0 ; i++ ) {
  total = total * i 
}
output(total)
```

|||

