
input0 = input0(8)
next = 1
current = 0
fib = 0

for ctr in range(0, input0 + 1):
  output(fib)
  fib = next + current
  next = current
  current = fib
