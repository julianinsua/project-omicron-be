import Org from 'src/Entities/Models/Organization'
import COLLECTION_NAMES from 'src/util/constants/collectionNames'
import generateId from 'src/util/generateId'
import { dbAccess } from '../DbAccess'

class OrgService {
  public async listOrgs() {
    const dbOrgList = await dbAccess.connection
      .collection(COLLECTION_NAMES.organizations)
      .find()
      .toArray()
    if (dbOrgList?.length > 0) {
      return dbOrgList.map(({ name, id, status, labs }) => new Org(name, status, id, [...labs]))
    }
  }

  public async create(org: Org) {
    return dbAccess.connection.collection(COLLECTION_NAMES.organizations).insertOne(org)
  }

  public async save(org: Org) {
    if (org.isNewOrg) {
      org.setId(generateId())
      const newDbOrg = await dbAccess.connection
        .collection(COLLECTION_NAMES.organizations)
        .insertOne(org)
      return newDbOrg
    }
    const dbOrg = await dbAccess.connection
      .collection(COLLECTION_NAMES.organizations)
      .replaceOne({ id: org.getId }, org)
    return dbOrg
  }
}

export default OrgService
