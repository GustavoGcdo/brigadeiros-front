export class Format {
  private static defaultString = 'Não informado';

  static stringDate(date: string) {
    let formatedDate = Format.defaultString;
    if (date) {
      formatedDate = new Date(date).toLocaleDateString();
    }
    return formatedDate;
  }

  static treatData(data: any) {
    if (data) {
      return data;
    }

    return Format.defaultString;
  }
}
