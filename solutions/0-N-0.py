
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
