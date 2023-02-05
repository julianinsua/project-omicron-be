import BaseError from 'src/Entities/Exeptions/BaseError'
import { HTTP_CODES, requestInterface } from 'src/Entities/Interfaces/RouterInterfaces'
import { GenericHandler } from 'src/Entities/Models/Server/GenericHandler'
import OrgService from 'src/services/db/OrgService'
import Org from 'src/Entities/Models/Organization'
import { ENTITY_NOT_FOUND, NOT_FOUND } from 'src/Entities/Exeptions/ExeptionCodes'

class ListOrgs extends GenericHandler {
  private orgService: OrgService

  public constructor(req?: requestInterface) {
    super(req)
    this.orgService = new OrgService()
  }

  public async handleRequest(): Promise<Object | BaseError> {
    try {
      const orgEntityList = await this.orgService.listOrgs()

      if(!orgEntityList || orgEntityList?.length === 0) {
        this.throwError( NOT_FOUND, HTTP_CODES.notFound, ENTITY_NOT_FOUND)
      }
      
      return { data: { orgList: orgEntityList?.map((org: Org) => org.humble) } }
    } catch (e: any) {
      throw this.genericErrorHandler(e)   
    }
  }
}

export default ListOrgs
