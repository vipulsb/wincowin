import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export class CoWinApi {
  private apiHost;
  constructor() {
    this.apiHost = "https://cdn-api.co-vin.in/api";
  }
  public async getStates() {
    const config: AxiosRequestConfig = {
      headers: { "Accept-Language": "hi_IN" },
    };
    const url = `${this.apiHost}/v2/admin/location/states`;
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
      },
    });
    return response.data;
  }
  public async getDistricts(stateId: number) {
    const config: AxiosRequestConfig = {
      headers: { "Accept-Language": "hi_IN" },
    };
    const url = `${this.apiHost}/v2/admin/location/districts/${stateId}`;
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
      },
    });
    return response.data;
  }
  public async getCalendarForDistrict(districtId: number, date: string) {
    const config: AxiosRequestConfig = {
      headers: { "Accept-Language": "hi_IN" },
    };
    const url = `${this.apiHost}/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`;
    const response: AxiosResponse = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",
      },
    });
    return response.data;
  }
}
