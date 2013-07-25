import sys
import os
import struct

def load(f):
    with open(f) as f:
        return f.read()

def dump(content):
    sys.stdout.write(content)

def main():
    filenames = sys.argv[1:]

    out_file = filenames[0]
    main_js_file = filenames[1]
    asset_files = filenames[2:]

    main_js = load(main_js_file)
    assets = [load(f) for f in asset_files]

    with open(out_file, 'w') as f:
        f.write(main_js)
        for asset in assets:
            f.write(struct.pack('<H', len(asset)))
            f.write(asset)

if __name__ == '__main__':
    main()
