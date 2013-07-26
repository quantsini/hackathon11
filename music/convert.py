from collections import namedtuple
import simplejson

Point = namedtuple('Point', 'note volume instrument')
patterns = []

note_class = {'A': 0, 'B': 2, 'C': 3, 'D': 5, 'E': 7, 'F': 8, 'G': 10}

class Pattern(object):
	def __init__(self):
		self.pattern = []

	def add(self, raw_string):
		note, volume, instrument = self.parse(raw_string)
		self.pattern.append(Point(note, volume, instrument))

	def parse(self, raw_string):
		components = raw_string.split(' ')
		note = note_class.get(components[0][0]) # lol
		if note is None:
			note = 0

		if components[0][1] == '#':
			note = note + 1

		if components[0][2] not in  ['#', '.']:
			note = note + 12 * int(components[0][2])

		if note != 0:
			note += 96

		volume = components[2]
		instrument = components[1]

		return note, volume, instrument

line = 'herp'
cur_pattern = None
with open("heroder.txt") as f:
	line = f.readline()
	while line:
		if 'PATTERN' in line:
			if cur_pattern is not None:
				patterns.append(cur_pattern)
			cur_pattern = [Pattern() for _ in xrange(4)]
		else:
			points = line.split(' : ')[1:5]
			[cur_pattern[x].add(points[x]) for x in xrange(4)]
		line = f.readline()


class Channel(object):
	def __init__(self):
		self.patterns = []
		self.order = []

	def generate(self):
		orders = [order + 1 for order in self.order]
		return {
			'p': orders,
			'c': self.generate_pattern(),
		}

	def generate_pattern(self):
		to_ret = []
		for pattern in self.patterns:
			to_ret.append({
				'n': [p.note for p in pattern[:32]]})
			to_ret.append({
				'n': [p.note for p in pattern[32:]]})

		return to_ret

channels = [Channel() for _ in xrange(4)]
# pattern row, channel
for instrument in xrange(4):
	pattern_arr = []
	for pattern in patterns:
		ppattern = pattern[instrument]
		channels[instrument].patterns.append(ppattern.pattern)


channels[0].order = [0, 1, 2, 3, 4, 5, 6 ,7]
channels[1].order = [0, 1, 2, 3, 4, 5, 6 ,7]
channels[2].order = [0, 1, 0, 2, 3, 4, 5, 6]
channels[3].order = [0, 1, 0, 0, 0, 2, 3, 4]

channels[0].order = [0,1, 2,3, 4,5, 6,7, 8,9, 10,11, 12,13, 14,15]
channels[1].order = [0,1, 2,3, 4,5, 6,7, 8,9, 10,11, 12, 13, 14, 15]
channels[2].order = [0,1, 2,3, 0,1, 4,5, 6,7, 8,9, 10,11, 12,13]
channels[2].order = [0,1, 2,3, 0,1, 0,1, 0,1, 4,5, 6,7, 8,9]

print channels[0].generate()
print '*'*100
print channels[1].generate()
print '*'*100
print channels[2].generate()
print '*'*100
print channels[3].generate()
print '*'*100
