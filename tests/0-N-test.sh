#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test '0-N.py'
run_python_test '-1' ''
run_python_test '3' $'0\n1\n2\n3'
run_python_test '7' $'0\n1\n2\n3\n4\n5\n6\n7'
end_python_test

