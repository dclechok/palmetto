function validateHeaders(parsedFiles) {
  //validate headers for sample file
  // "Location" "Serial #" "Asset #" "Make" "Model" "Hashrate"
  console.log(parsedFiles)
  for (let file in parsedFiles) {
    if (
      parsedFiles[file][0][0].toLowerCase() !== "location" ||
      parsedFiles[file][0][1].toLowerCase() !== "serial #" ||
      parsedFiles[file][0][2].toLowerCase() !== "asset #" ||
      parsedFiles[file][0][3].toLowerCase() !== "make" ||
      parsedFiles[file][0][4].toLowerCase() !== "model" ||
      parsedFiles[file][0][5].toLowerCase() !== "hashrate"
    ) return window.alert('Headers invalid! Your headers (cells) must be: "Location" (A1), "Serial #" (B1), "Asset #" (C1), "Make (D1)", "Model" (E1), "Hashrate" (F1)!');
    else return true;
  }
}

export default validateHeaders;
