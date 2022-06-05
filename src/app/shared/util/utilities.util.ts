export abstract class Utilities {

  public static formatString(str: string, ...val: string[]) {
    for (let i = 0; i < val.length; i++) {
      str = str.replace(`{${i}}`, val[i]);
    }
    return str;
  }

}
