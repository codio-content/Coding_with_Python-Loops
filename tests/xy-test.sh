#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'xy.py'
run_python_test '1 1' '1'
run_python_test '1 2' '1'
run_python_test '2 4' '16'
run_python_test '3 5' '243'
end_python_test
