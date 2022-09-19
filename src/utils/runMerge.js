import Papa from "papaparse";
//once files have both been validated, search if sample file has entry that matches one in master file
//if so populate sample file with those details

// 1) merge the two files into the one sample file where criteria is found/pulled from master file
// 2) build a log of each item in sample file
function runMerge(parsedFiles) {
  const { psf, pmf } = parsedFiles; //parsed sample file, parsed master file
  const log = [];
  const updatedSampleFile = [];
  //trim headers off, and last entry is empty in papa parse
  const trimmedSampleFile = psf.slice(1, psf.length - 1);
  const trimmedMasterFile = pmf.slice(1, pmf.length - 1);
  // for each sample file entry, search for it in the masterFile array. if match, push details to 'log' array

  trimmedSampleFile.forEach((sampleFile) => {
    if (
      trimmedMasterFile.find((masterFile) => sampleFile[0] === masterFile[0])
    ) {
      log.push({
        mergeSuccess: "Merge Success",
        serial: sampleFile[1],
        sampleMatchIndex: trimmedSampleFile.indexOf(sampleFile) + 2,
        masterMatchIndex:
          trimmedMasterFile.indexOf(
            trimmedMasterFile.find(
              (masterFile) => sampleFile[0] === masterFile[0]
            )
          ) + 2,
        details: "detail",
      });
      updatedSampleFile.push(
        trimmedMasterFile.filter(
          (masterFile) => sampleFile[0] === masterFile[0]
        )
      );
    } else {
      log.push({
        mergeSuccess: "No Match",
        serial: sampleFile[1],
        sampleMatchIndex: trimmedSampleFile.indexOf(sampleFile) + 2,
        masterMatchIndex: "",
        details: "detail",
      });
      console.log(sampleFile, updatedSampleFile)
      updatedSampleFile.push([sampleFile]);
    }
  });

  // return updatedSampleFile which is our updated Sample File with Master File entries merged, and log of what occured to render in UI

  return { updatedFile: updatedSampleFile, log: log };
}

export default runMerge;
