import Api from "./Api";

export class GetPage {
  public static async getPerson(id: number) {
    const response = await Api().get(`/people/${id}`);
    return response.data;
  }
}
