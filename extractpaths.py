import base64
from itertools import count
from lxml import etree
import struct
import sys

NS_SVG = 'http://www.w3.org/2000/svg'

def process_path_data(d):
    relative = False
    cur = (0,0)
    points = []
    mode = ''
    index = 0

    for part in d.split():
        if ',' not in part:
            # We assume all nodes are smooth ('s'), but we don't support the
            # actual 's' command.
            mode = part.upper()
            assert mode in 'MCZ'
            index = 0

            relative = (part.lower() == part)
        else:
            bx,by = cur if relative else (0,0)
            dx,dy = map(float, part.split(','))
            point = dx+bx, dy+by
            points.append(point)

            index += 1
            if mode == 'M' or (mode == 'C' and index == 3):
                cur = point
                index = 0

    return points

def adjust_bounding_box(min_out, max_out, paths):
    """Adjust the points in 'paths' to center the shape in the box 1,1 - 255,255."""
    min_x = min(x for path in paths for x,y in path)
    max_x = max(x for path in paths for x,y in path)
    min_y = min(y for path in paths for x,y in path)
    max_y = max(y for path in paths for x,y in path)

    size_x = max_x - min_x
    size_y = max_y - min_y
    size_out = max_out - min_out

    if size_x > size_y:
        scale = size_out / size_x
        base_x = min_out
        base_y = min_out + scale * (size_x - size_y) / 2
    else:
        scale = size_out / size_y
        base_x = min_out + scale * (size_y - size_x) / 2
        base_y = min_out

    def adjust((x,y)):
        x = base_x + scale * (x - min_x)
        y = base_y + scale * (y - min_y)
        return (x,y)

    return [map(adjust, path) for path in paths]

def round_to_pixel(paths):
    return [[(int(round(x)), int(round(y))) for x,y in path] for path in paths]

def main(infile, outfile):
    xml = etree.parse(infile)

    paths = []
    for path in xml.iter('{%s}path' % NS_SVG):
        paths.append(process_path_data(path.get('d')))

    paths = round_to_pixel(
            adjust_bounding_box(32, 126,
                paths))

    xs = []
    ys = []
    for path in paths:
        first = path[0:4]
        rest = [p for p,i in zip(path[4:], count(0)) if i % 3 != 0]

        xs.extend(x for x,y in first + rest)
        ys.extend(y for x,y in first + rest)

    def diffencode(cs, cur, center):
        s = ''
        for c in cs:
            print('diff from %d to %d is %d' % (cur, c, c - cur))
            s += chr(c - cur + center)
            cur = c
        return s

    start = (126 - 32) / 2 + 2
    center = start
    content = diffencode(xs, start, center) + diffencode(ys, start, center)

    with open(outfile, 'w') as f:
        if True:
            f.write(content)
        else:
            f.write(base64.b64encode(content))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
