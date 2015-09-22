
import test

test.test('xy.py', [1,1], [1])
test.test('xy.py', [1,2], [1])
test.test('xy.py', [2,4], [16])
test.test('xy.py', [3,5], [243])

print 'Well done'
