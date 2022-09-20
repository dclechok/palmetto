import Papa from "papaparse";
import dateFormatter from "./dateFormatter";

const fileDownload = require("js-file-download");

function exportCsv(mergedFile) {
  const csv = Papa.unparse({
    fields: [
      //headers
      "Location",
      "Serial #",
      "Asset #",
      "Make",
      "Model",
      "Hashrate",
    ],
    data: mergedFile.map((asset) =>
      [
        asset[0][0] || "", // ex. "PA01-XXX-XXXX-XXX"
        asset[0][1] || "", // serial number
        asset[0][2] || "", // asset tag
        asset[0][3] || "", // MAKE
        asset[0][4] || "", //model
        asset[0][5] || "", //hashrate
      ]
    ),
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const newDate = new Date();
  fileDownload(blob, `PalmettoMerge ${dateFormatter(newDate)}.csv`);
}

export default exportCsv;
