function validateHeaders(parsedFiles) {

  //validate headers for SAMPLE file
  // "Location" "Serial #" "Asset #" "Make" "Model" "Hashrate"
    if (
      parsedFiles.psf[0][0].toLowerCase() !== "location" ||
      parsedFiles.psf[0][1].toLowerCase() !== "serial #" ||
      parsedFiles.psf[0][2].toLowerCase() !== "asset #" ||
      parsedFiles.psf[0][3].toLowerCase() !== "make" ||
      parsedFiles.psf[0][4].toLowerCase() !== "model" ||
      parsedFiles.psf[0][5].toLowerCase() !== "hashrate"
    ) return window.alert('Sample file headers are invalid! Your headers (cells) must be: "Location" (A1), "Serial #" (B1), "Asset #" (C1), "Make (D1)", "Model" (E1), "Hashrate" (F1)!');
    
  //validate headers for MASTER file
  // "Location" "Serial #" "Asset #" "Make" "Model" "Hashrate"
  if (
    parsedFiles.pmf[0][1].toLowerCase() !== "site" || // we do not use site yet
    parsedFiles.pmf[0][1].toLowerCase() !== "location" ||
    parsedFiles.pmf[0][2].toLowerCase() !== "serial #" ||
    parsedFiles.pmf[0][3].toLowerCase() !== "asset #" ||
    parsedFiles.pmf[0][4].toLowerCase() !== "make" ||
    parsedFiles.pmf[0][5].toLowerCase() !== "model" ||
    parsedFiles.pmf[0][6].toLowerCase() !== "hashrate"
  ) return window.alert('Master file headers are invalid! Your headers (cells) must be: "Site" (A1), "Location" (B1), "Serial #" (C1), "Asset #" (D1), "Make (E1)", "Model" (F1), "Hashrate" (G1)!');
    
  return true;
  
}

export default validateHeaders;
