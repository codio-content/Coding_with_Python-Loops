
N = int(sys.argv[2]) # Get N from the command line

total = 0            # intialize our total variable

for ctr in range(0, N +1):  # we use N +1 because range(0,10) = [0..9]
  total = total + ctr       # increase our total by the loop amount
  print(str(total))         # output the total as far
  
print('Final total : ' + str(total)) # output the final total
