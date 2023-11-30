import * as XLSX from "xlsx";

const generateExcelAndEmail = (data: Array<any>) => {
  const ws = XLSX.utils.json_to_sheet(data[0].data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    wb,
    ws,
    `Nutrifit_Assessment_${new Date().getUTCDate()}`
  );
  const binaryString = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
  const base64String = btoa(binaryString);
  const formData = new FormData();
  formData.append("file", base64String);
  formData.append("email", localStorage.getItem("email") || "");
  return formData;
};
export default generateExcelAndEmail;
