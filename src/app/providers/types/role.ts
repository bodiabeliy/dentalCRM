export interface IRoles {
  items: IRole[]
}

export interface IRole {
  id: number
  name: string
  code: string
  order: number
  permissions: IRolePermition[]
}

export interface IRolePermition {
  id?: number
  code?: string
  description?: string
  assigned?: boolean
}
