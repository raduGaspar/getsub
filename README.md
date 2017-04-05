# getsub
A subtitle downloader utility

Install:
```sh
# method 1: clone this repo and run
npm install
npm install -g .

# method 2: from npm
npm install -g getsub
```

Usage:
```sh
# show help
getsub -h

# show available subtitle translations for a given movie, tv-show, etc.
# will return a comma-separated list ex: en,es,pl,pt
getsub -s path/to/file.ext

# download subtitle for a given movie, tv-show, etc.
# will download a *.srt with the same name as the video file
# by default it will try to download an en subtitle
getsub -v path/to/file.ext

# you can specify the subtitle language to download like so:
getsub -v path/to/file.ext -l es
```

There are no known issues related to video file extensions, it should work fine with *.mkv, *.mp4 and other video formats.