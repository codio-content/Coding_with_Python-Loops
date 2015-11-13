#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'squared.py'
run_python_test '5' '55'
run_python_test '2' '5'
run_python_test '-2' '0'
end_python_test
