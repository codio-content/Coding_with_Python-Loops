#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'factorial.py'
run_python_test '4' '24'
run_python_test '10' '3628800'
run_python_test '-1' '1'
run_python_test '1' '1'
end_python_test
