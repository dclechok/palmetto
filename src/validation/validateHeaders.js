function validateHeaders(parsedFiles) {
  //validate headers for sample file
  // "Location" "Serial #" "Asset #" "Make" "Model" "Hashrate"
  console.log(parsedFiles)
  for (let file in parsedFiles) {
    if (
      parsedFiles[file][0][0] !== "Location" ||
      parsedFiles[file][0][1] !== "Serial #" ||
      parsedFiles[file][0][2] !== "Asset #" ||
      parsedFiles[file][0][3] !== "Make" ||
      parsedFiles[file][0][4] !== "Model" ||
      parsedFiles[file][0][5] !== "Hashrate"
    ) return window.alert('Headers invalid! Your headers (cells) must be: "Location" (A1), "Serial #" (B1), "Asset #" (C1), "Make (D1)", "Model" (E1), "Hashrate" (F1)!');
  }
}

export default validateHeaders;
