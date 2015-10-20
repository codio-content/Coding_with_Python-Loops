
input0 = input0(10)  # load our special variable
total = 0            # intialize our total variable

for ctr in range(0, input0 +1): # we use input0 +1 because range(0,10) = [0..9]
  total = total + ctr           # increase our total by the loop amount
  output(total)                 # output the total as far
  
output('Final total : ' + str(total)) # output the final tota;l
