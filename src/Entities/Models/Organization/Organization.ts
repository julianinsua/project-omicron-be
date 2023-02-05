export enum ORG_STATUS {
  draft = 'draft',
  active = 'active',
  inactive = 'inactive'
}


class Org {
  private id?: string
  private name: string
  private status: ORG_STATUS = ORG_STATUS.draft
  private labs: Array<string> = []

  public constructor( name: string, status: ORG_STATUS, id?: string, labs?: Array<string>) {
    this.id = id
    this.name = name
    this.status = status
    if (labs) {
      this.labs = [...labs]
    }
  }
  
  public setId(id: string) {
    this.id = id
  }

  public setStatus(status: ORG_STATUS) {
    this.status = status
  }

  public get humble() {
    return { id: this.id, name: this.name, labs: [...this.labs] }
  }

  public get isNewOrg() {
    return !this.id
  }

  public get getId() {
    return this.id
  }

  public get getStatus() {
    return this.status
  }
}

export default Org
