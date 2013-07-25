hackathon11
===========

Hackathon 11 - demoscene


Setup
=====

Install the necessary Debian packages:

    sudo apt-get install ghc cabal-install optipng pngtools

Install the necessary Haskell packages:

    cabal install language-ecmascript language-glsl shake

Download and unpack the Google Closure Compiler:

    # from the 'hackathon11' directory:
    mkdir deps
    cd deps
    wget http://dl.google.com/closure-compiler/compiler-latest.tar.gz
    tar -xf compiler-latest.tar.gz

Compile:

    make
