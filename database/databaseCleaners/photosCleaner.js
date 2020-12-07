const csv = require('csv-parser');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fs = require('fs');
const Transform = require('stream').Transform;


for (let i = 0; i <= 1; i++) {
  let idx;
  if (!idx && i === 0) {
    idx = 1;
  } else if (!idx && i === 1) {
    idx = 99939;
  }
  const csvStringifier = createCsvStringifier({
    header: [
      { id: 'id', title: 'id' },
      { id: 'styleId', title: 'style_id' },
      { id: 'url', title: 'url' },
      { id: 'thumbnail_url', title: 'thumbnail_url' }
    ],
  });

  let readStream = fs.createReadStream(`../rawDatabases/photos-${i}.csv`);
  let writeStream = fs.createWriteStream(`../cleanedDatabases/photos-${i}.csv`);
  // let readStream = fs.createReadStream('../sampleDatabase/photosSample.csv');
  // let writeStream = fs.createWriteStream('../cleanedSamples/photosSample.csv');

  class PhotosCleaner extends Transform {
    constructor(options) {
      super(options);
    }

    _transform(chunk, encoding, next) {
      let chunks = [];
      for (let key in chunk) {
        let trimKey = key.trim();
        chunk[trimKey] = chunk[key];
        if (trimKey !== key) {
          delete chunk[key];
        }
        if (trimKey === 'thumbnail_url' && chunk[trimKey].indexOf('\n') >= 0) {
          let parts = chunk[trimKey].split('\n');
          chunks.push(parts[1]);
          chunk[trimKey] = parts[0];
        }
        if (trimKey[0] === '_') {
          chunks.push(chunk[trimKey]);
          delete chunk[trimKey];
        }
      }
      chunk.id = idx;
      idx++;
      chunk = csvStringifier.stringifyRecords([chunk]);
      this.push(chunk);
      if (chunks.length) {
        chunks = chunks.join('').split('\n');
        for (let i = 0; i < chunks.length; i++) {
          let arr = chunks[i]
            .split('"').join('')
            .split('0htt').join('0,htt')
            .split('2htt').join('2,htt')
            .split('3htt').join('3,htt')
            .split('4htt').join('4,htt')
            .split('9htt').join('9,htt')
            .split('uhtt').join('u,htt')
            .split(',');
          let obj = {
            id: idx,
            styleId: arr[1],
            url: arr[2],
            thumbnail_url: arr[3]
          };
          idx++;
          chunk = csvStringifier.stringifyRecords([obj]);
          this.push(chunk);
        }
      }
      next();
    }
  }

  const transformer = new PhotosCleaner({ writableObjectMode: true });

  writeStream.write(csvStringifier.getHeaderString());

  readStream
    .pipe(csv())
    .pipe(transformer)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`Finished transforming photos-${i}.csv`);
    });
}