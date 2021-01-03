import { Role } from '@modules/roles/Role'
import RoleModel from '@modules/roles/role.schema'
import DataLoader from 'dataloader'

export const createRoleLoader = () =>
  new DataLoader<string, Role>(async (roleIds) => {
    const roles: Role[] = await RoleModel.find({ _id: { $in: roleIds as string[] } }).lean()
    const roleIdToRole: Record<string, Role> = {}
    roles.map((r) => (roleIdToRole[r._id as string] = r))
    const sortedRoles = roleIds.map((roleId) => roleIdToRole[roleId])
    return sortedRoles
  })
