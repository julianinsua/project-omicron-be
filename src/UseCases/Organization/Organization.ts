import { Handler } from "src/Entities/Interfaces/RouterInterfaces";
import GenericAdapter from "src/Entities/Models/Server/GenericAdapter";
import ListOrgs from "./ListOrgs/ListOrgs";

class Organization extends GenericAdapter {
  public static orgList(): Handler {
    const orgList = new ListOrgs()
    return this.createHandler(orgList)
  }
}

export default Organization
