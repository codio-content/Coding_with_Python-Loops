#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'fibonacci.py'
run_python_test '8'  $'0\n1\n1\n2\n3\n5\n8\n13\n21'
run_python_test '0'  $'0'
run_python_test '1'  $'0\n1'
run_python_test '-1' $''
run_python_test '10' $'0\n1\n1\n2\n3\n5\n8\n13\n21\n34\n55'
end_python_test
