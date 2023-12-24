import Papa from "papaparse";
import { UrlRows, RawRow } from "./models";

export async function getData(): Promise<UrlRows> {
  const csvData: string = await (await fetch("./data.csv")).text();

  const { data } = Papa.parse<RawRow>(csvData, {
    header: true,
    dynamicTyping: true,
  });

  const urlRows = data.reduce<UrlRows>(
    (acc, { url, ...row }) => ({
      ...acc,
      [url]: [...(acc[url] || []), row],
    }),
    {} as UrlRows
  );

  return urlRows;
}
