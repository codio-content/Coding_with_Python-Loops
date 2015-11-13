#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'N-0.py'
run_python_test '-1' $''
run_python_test '3' $'3\n2\n1\n0'
run_python_test '10' $'10\n9\n8\n7\n6\n5\n4\n3\n2\n1\n0'
end_python_test
