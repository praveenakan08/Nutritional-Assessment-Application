import axios from "axios";
import * as XLSX from "xlsx";
import API_URL from "..";

const generateExcelAndEmail = (data: Array<any>) => {
  console.log("Data", data);
  const ws = XLSX.utils.json_to_sheet(data[0].data);
  console.log("ws", ws);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    ws,
    `Nutrifit_Assessment_${new Date().getUTCDate()}`
  );
  const binaryString = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  // Convert the binary string to a Blob
  console.log("Binary String:", binaryString);
  // const blob = new Blob([s2ab(binaryString)], {
  //   type: "application/octet-stream",
  // });
  // // const file = new File([blob], "file.xlsx", { type: blob.type });
  // console.log("Blob", blob);
  const base64String = btoa(binaryString);

  const formData = new FormData();
  formData.append("file", base64String);
  formData.append("email", localStorage.getItem("email") || "");

  axios
    .post(API_URL + "/sendEmail", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((result) => {
      console.log("Result", result);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const s2ab = (s: string) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};

export default generateExcelAndEmail;
