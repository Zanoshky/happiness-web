export default class Utils {
  static getApiUri() {
    return process.env.NODE_ENV === "production" ? "https://my-office-happiness.com:9443" : "http://localhost:9000";
  }
}
