import Api from "./Api"

export default {
  getLinkBar() {
    return Api().get("linkBar");
  }
}
