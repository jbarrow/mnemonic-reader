all: .py .js


.py:
	pyinstaller mnemonic/api.py --distpath mnemonicdist
	rm -rf build/
	rm -rf api.spec
	

.js:
	./node_modules/.bin/electron-packager . --overwrite --ignore="mnemonic$$"

clean:
	rm -rf mnemonic-reader-linux-x64
	rm -rf mnemonicdist/

.PHONY: all
