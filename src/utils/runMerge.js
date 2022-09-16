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
  //   console.log(trimmedSampleFile, trimmedMasterFile);
  //find if serial number from sample file exists in master file

  //   trimmedSampleFile.forEach(sampleFile => {
  //     trimmedMasterFile.find(masterFile => {
  //         if(sampleFile[0] === masterFile[0]){
  //             log.push({ mergeSuccess: 'Merge Success', serial: 'sn', sampleMatchIndex: 'sampleMatchIdx', masterMatchIndex: 'masterMatchIdx', details: 'detail'});
  //             updatedSampleFile.push(masterFile);
  //         }else
  //             log.push({ mergeSuccess: 'Merge Fail', serial: 'sn', sampleMatchIndex: 'sampleMatchIdx', masterMatchIndex: 'masterMatchIdx',  details: 'detail'});
  //     })});

  trimmedSampleFile.forEach((sampleFile) => {
    if (
      trimmedMasterFile.find((masterFile) => sampleFile[0] === masterFile[0])
    ) {
      log.push({
        mergeSuccess: "Merge Success",
        serial: sampleFile[1],
        sampleMatchIndex: "sampleMatchIdx",
        masterMatchIndex: "masterMatchIdx",
        details: "detail",
      });
      updatedSampleFile.push(
        trimmedMasterFile.filter(
          (masterFile) => sampleFile[0] === masterFile[0]
        )
      );
    } else
      log.push({
        mergeSuccess: "No Match",
        serial: sampleFile[1],
        sampleMatchIndex: "sampleMatchIdx",
        masterMatchIndex: "masterMatchIdx",
        details: "detail",
      });
  });

  console.log(log, updatedSampleFile);

  return { updatedFile: updatedSampleFile, log: log };
}

function exportCsv(newFile) {}

export default runMerge;

// log[{
//     line#
//     serial#
//     what happened
// }]
