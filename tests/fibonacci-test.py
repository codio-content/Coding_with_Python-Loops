
import test

test.test('challenges/fibonacci.py', [8], [0,1,1,2,3,5,8,13,21])
test.test('challenges/fibonacci.py', [10], [0,1,1,2,3,5,8,13,21,34,55])
test.test('challenges/fibonacci.py', [0], [0])
test.test('challenges/fibonacci.py', [1], [0,1])
test.test('challenges/fibonacci.py', [-1], [])

print('Well done')
