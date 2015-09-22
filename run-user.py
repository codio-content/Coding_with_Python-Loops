
import linecache
import sys

def input0(v):
  return v

def input1(v):
  return v

def input2(v):
  return v

def output(v):
  print v

def printException():
    exc_type, exc_obj, tb = sys.exc_info()
    f = tb.tb_frame
    filename = f.f_code.co_filename
    lineno = tb.tb_lineno
    print exc_obj  
  
try:
  execfile(sys.argv[1])
  
  exit(0)
except (IOError, SyntaxError, NameError) as e:
  printException()
  
exit(1)
