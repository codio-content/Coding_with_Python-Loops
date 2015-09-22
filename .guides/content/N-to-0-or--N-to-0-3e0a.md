Test your code here first {Run}(node run-user.js 0-N-0.js)

{Check It!|assessment}(test-1027007121)

|||guidance
## Solution
```javascript
input0 = 6
direction = 0

if ( input0 < 0) {
  direction = 1  
}
else {
  direction = -1
}

while ( input0 != 0 ) {
  output(input0)
  input0 = input0 + direction
}
```
|||
