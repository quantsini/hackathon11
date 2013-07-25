yelp.html: shake ALWAYS_REBUILD
	./shake --color $@

build/%.png: shake ALWAYS_REBUILD
	./shake --color $@

clean: shake
	./shake clean
	rm -f shake

shake: shake.hs Assets.hs
	ghc --make -outputdir build $<

ALWAYS_REBUILD:

.PHONY: clean ALWAYS_REBUILD
