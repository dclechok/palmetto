import Papa from "papaparse";
//once files have both been validated, search if sample file has entry that matches one in master file
//if so populate sample file with those details

// 1) merge the two files into the one sample file where criteria is found/pulled from master file
// 2) build a log of each item in sample file
function runMerge(parsedFiles) {
  const { psf, pmf } = parsedFiles; //parsed sample file, parsed master file
  //trim headers off, and last entry is empty in papa parse
  const trimmedSampleFile = psf.slice(1, psf.length - 1);
  const trimmedMasterFile = pmf.slice(1, pmf.length - 1);
  console.log(trimmedSampleFile, trimmedMasterFile);
  //find if serial number from sample file exists in master file
  const updatedSampleFile = trimmedMasterFile.filter((masterEntry) =>
    trimmedSampleFile.find((sampleEntry) => masterEntry[1] === sampleEntry[1])
  );
  return updatedSampleFile;
}

export default runMerge;
