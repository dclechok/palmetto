import Papa from "papaparse";
import dateFormatter from "./dateFormatter";

const fileDownload = require("js-file-download");

function exportCsv(mergedFile) {
  console.log(mergedFile);
  const csv = Papa.unparse({
    fields: [
      //headers
      "Location",
      "Serial Number",
      "Asset Tag",
      "Make",
      "Model",
      "Hash Rate",
    ],
    data: mergedFile.map((asset) => {
      return [
        asset[0] || "", // ex. "PA01-XXX-XXXX-XXX"
        asset[1] || "", // serial number
        asset[2] || "", // asset tag
        asset[3] || "", // MAKE
        asset[4] || "", //model
        asset[5] || "", //hashrate
        asset[6] || "", // hash rate
      ];
    }),
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const newDate = new Date();
  fileDownload(blob, `PalmettoMerge ${dateFormatter(newDate)}.csv`);
}

export default exportCsv;
