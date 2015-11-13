#!/bin/bash
. /home/codio/workspace/tests/python-test-lib.sh

start_python_test 'times-table.py'
run_python_test '1' $'1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12'
run_python_test '-1' $'-1\n-2\n-3\n-4\n-5\n-6\n-7\n-8\n-9\n-10\n-11\n-12'
run_python_test '6' $'6\n12\n18\n24\n30\n36\n42\n48\n54\n60\n66\n72'
end_python_test
