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
      trimmedMasterFile.find((masterFile) =>
       sampleFile[1].trim() === masterFile[1].trim() &&//if serial number is found in both files
       sampleFile[1].trim() !== '' && sampleFile[1].trim() !== 'N/A'
       )) {
      log.push({
        mergeSuccess: "Merge Success",
        serial: sampleFile[1],
        sampleMatchIndex: trimmedSampleFile.indexOf(sampleFile) + 2,
        masterMatchIndex:
          trimmedMasterFile.indexOf(
            trimmedMasterFile.find(
              (masterFile) => sampleFile[1] === masterFile[1]
            )
          ) + 2,
        details: "Serial # match found",
      });
      updatedSampleFile.push(
        trimmedMasterFile.filter(
          (masterFile) => sampleFile[1] === masterFile[1]
        )
      );
    } else if (
      trimmedMasterFile.find((masterFile) =>
       sampleFile[2].trim() === masterFile[2].trim() &&//if no serial number is found but Asset # IS found
       sampleFile[2].trim() !== '' && sampleFile[2].trim() !== 'N/A'
       )) {
      log.push({
        mergeSuccess: "Merge Success",
        serial: sampleFile[2],
        sampleMatchIndex: trimmedSampleFile.indexOf(sampleFile) + 2,
        masterMatchIndex:
          trimmedMasterFile.indexOf(
            trimmedMasterFile.find(
              (masterFile) => sampleFile[2] === masterFile[2] && sampleFile[2] !== '' && masterFile[2] !== ''
            )
          ) + 2,
        details: "Asset # match found",
      });
      updatedSampleFile.push(
        trimmedMasterFile.filter(
          (masterFile) => sampleFile[2] === masterFile[2]
        )
      );
    }
    else {
      log.push({
        mergeSuccess: "No Match",
        serial: '',
        sampleMatchIndex: trimmedSampleFile.indexOf(sampleFile) + 2,
        masterMatchIndex: "",
        details: "No match found.",
      });
      updatedSampleFile.push([sampleFile]);
    }
  });
  // return updatedSampleFile which is our updated Sample File with Master File entries merged, and log of what occured to render in UI

  return { updatedFile: updatedSampleFile, log: log };
}

export default runMerge;
