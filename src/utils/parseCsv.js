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

  return { psf: parsedSampleFile, pmf: parsedMasterFile };
}

export default parseCsv;
