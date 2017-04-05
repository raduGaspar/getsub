const path = require('path');
const crypto = require('crypto');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const request = Promise.promisifyAll(
  require('request'),
  { multiArgs: true }
);
const Colors = require('./Colors.js').Colors;

const API = {
  subs: {
    globals: {
      url: 'http://sandbox.thesubdb.com/', // api.thesubdb.com
      headers: {
        'User-Agent': 'SubDB/1.0 (SubtitleDownloader/1.0; https://github.com/raduGaspar/getsub)',
      },
    },
    search: {
      action: 'search',
      hash: null,
    },
    download: {
      action: 'download',
      hash: null,
      language: null,
    },
  },
};

const msg = {
  search: 'The following subtitle languages are available for download:',
  downloaded: 'The subtitle was downloaded',
};

// generate video file hash
const getHash = (file) => {
  let endPos = 0;
  const halfBuffer = 64 * 1024;

  // create a 128kb buffer
  const resBuffer = Buffer.alloc(halfBuffer * 2);

  return fs.statAsync(file)
    .then((stats) => {
      endPos = stats.size - halfBuffer;
      return fs.openAsync(file, 'r');
    })
    .then((fd) => {
      return Promise.all([
        // write the first 64kb into the buffer
        fs.readAsync(fd, resBuffer, 0, halfBuffer, 0),
        // write the last 64kb into the buffer
        fs.readAsync(fd, resBuffer, halfBuffer, halfBuffer, endPos)
      ]);
    })
    .then(() => {
      return new Promise((resolve) => {
        // resolve buffer to hex
        resolve(crypto
          .createHash('md5')
          .update(resBuffer)
          .digest('hex')
        );
      });
    });
};

// download subtitle
const getSubtitle = (file, opts = {}) => {
  if (!file) return;
  const { search, language } = opts;

  getHash(file).then((hash) => {
    // console.log(`file ${file} hash: ${hash}`);
    const fileName = path.basename(file).split('.');
    const dirName = path.dirname(file);
    fileName.pop(); // remove extension from fileName
    const subtitlePath = `${dirName}/${fileName.join('.')}.srt`;
    const downloadOpts = Object.assign({}, API.subs.globals, {
      qs: {
        hash,
        language: language || 'en',
        action: 'download',
      }
    });
    const searchOpts = Object.assign({}, API.subs.globals, {
      qs: {
        hash,
        action: 'search',
      }
    });

    if (search) {
      request.getAsync(searchOpts).spread((res, body) => {
        console.log(`${Colors.apply(msg.search, Colors.GREEN)}\n${body}`);
      });
    } else {
      request.getAsync(downloadOpts).spread((res, body) => {
        // console.log(res.statusCode);
        // console.log(body);
        return fs.writeFileAsync(subtitlePath, body);
      }).then(() => {
        console.log(`\n${Colors.apply(msg.downloaded, Colors.GREEN)}\n`);
      });
    }
  });
};

exports.getSubtitle = getSubtitle;
