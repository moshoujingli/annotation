generateFileArrays: ./js/imgs.js ./Makefile

./js/imgs.js: ./pic/*
	echo "pics=[ " > ./js/imgs.js
	ls ./pic/*|awk '{print "\""$$1"\"\n,"}'|sed '$$d' >> ./js/imgs.js
	echo "];" >> ./js/imgs.js

clean:
	rm ./js/imgs.js