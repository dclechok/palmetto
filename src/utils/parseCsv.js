import Papa from "papaparse";

async function parseCsv(sampleFile, masterFile) {
  let parsedSampleFile, parsedMasterFile;
  //parse sample file
  await new Promise((resolve, reject) => {
    try {
      Papa.parse(sampleFile[0], {
        complete: function (results) {
          resolve((parsedSampleFile = results.data));
        },
      });
    } catch (e) {
      reject("Error parsing sample file!");
    }
  });
  //parse master file
  await new Promise((resolve, reject) => {
    try {
      Papa.parse(masterFile[0], {
        complete: function (results) {
          resolve(parsedMasterFile = results.data);
        },
      });
    } catch (e) {
      reject("Error parsing master file!");
    }
  });
  //ignore first column of master file "site" will not be used
  const trimFirstCol = parsedMasterFile.map(item => item.slice(1, 7));

  return { psf: parsedSampleFile, pmf: trimFirstCol };
}

export default parseCsv;
