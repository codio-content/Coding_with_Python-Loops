
input0 = 8

for ( ctr = 0, next = 1, current = 0, fib = 0; ctr <= input0; ctr ++) {
  output(fib)
  fib = next + current
  next = current
  current = fib
}
