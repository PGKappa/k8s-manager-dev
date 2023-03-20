import axios from "@/lib/axios";

type RequestExportArgs = {
  onSuccess: Function;
  onError: Function;
  params: [];
};

export type RequestExportResponse = {};

export function requestExportReports({
  onSuccess,
  onError,
  params,
}: RequestExportArgs) {
  axios
    .get("/api/mui/manager/export", {
      params: params,
      headers: {
        "Content-type": "application/json",
      },

      responseType: "blob",
    })
    .then((response) => {
      const res: RequestExportResponse = response.data;
      onSuccess(res);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        response.headers["content-disposition"].split("filename=")[1]
      );
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      onError(error);
    });
}
