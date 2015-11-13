#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test '0-N-0.py'
run_python_test '3' $'3\n2\n1'
run_python_test '-3' $'-3\n-2\n-1'
run_python_test '6' $'6\n5\n4\n3\n2\n1'
end_python_test
