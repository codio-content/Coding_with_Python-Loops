
import test

test.test('factorial.py', [4], [24])
test.test('factorial.py', [10], [3628800])
test.test('factorial.py', [-1], [1])
test.test('factorial.py', [1], [1])

print 'Well done'
