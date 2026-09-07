import { useState, useEffect, useCallback, useMemo } from 'react'
import { Box } from '@mui/material'
import { PrimaryButton } from '../../../../shared/components'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'

import { EnhancedPermissionsTable } from '../../ui/permissions-table/enhanced-permissions-table-export'
import { AddRoleDialog } from '../../ui/add-role'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { getAllRoles, setRolePermissions } from '../../../../app/services/RoleService'
import { getClinicRefercies } from '../../../../app/services/ClinicService'
// import { clinicRefernciesSelector } from '../../../../app/providers/reducers/ClinicSlice'
// Remove mock permissions model – we rely entirely on server data
import { rolesSelector } from '../../../../app/providers/reducers/RoleSlice'
import { getCurrentUserNotification } from '../../../../app/providers/reducers/UserSlice'
// Permissions now come exclusively from server responses via getAllRoles
import type { IRolePermition } from '../../.././../app/providers/types/role'
import { useTranslation } from 'react-i18next'

interface Permission {
  label: string
  values: boolean[]
  code?: string
  id?: number
}

export function PermissionsManagement() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [localPermissions, setLocalPermissions] = useState<Permission[]>([])
  const [openAddRoleDialog, setOpenAddRoleDialog] = useState(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation(['workers'])

  // Get clinic references for roles
  // Clinic references not used for permissions table

  // Get role permissions from Redux store
  const roleData = useAppSelector(rolesSelector)
  const roleItems = useMemo(() => roleData?.items || [], [roleData])

  // Get role names from the roles array
  const roleNames = useMemo(() => roleItems?.map((role) => role.name), [roleItems]) // Use server roles (roleItems) for headers and matrix sizing

  // Use the total rows from our permissions array
  const totalRows = localPermissions.length

  // Helper to map permissions from API to our format
  const mapApiPermissionsToLocal = useCallback(() => {
    if (!roleItems.length) {
      console.log('No roles or role items available for mapping permissions')
      return
    }

    // Start with the base permission structure
    const permissionMap: { [key: string]: Permission } = {}

    // Extract all unique permissions from all roles
    roleItems.forEach((role) => {
      if (role.permissions && role.permissions.length) {
        role.permissions.forEach((permission) => {
          const permCode = permission.code || ''
          const permDescription = permission.description || ''

          // Use the code as the key, or fallback to a normalized description
          const permKey = permCode.toLowerCase() || permDescription.toLowerCase().replace(/\s+/g, '_')

          if (!permKey) return // Skip if no valid key can be created

          // If this permission is not already in our map, add it
          if (!permissionMap[permKey]) {
            permissionMap[permKey] = {
              label: permDescription || permCode,
              values: new Array(roleItems.length).fill(false),
              code: permCode,
              id: permission.id,
            }
            console.log(`Added permission: ${permDescription || permCode} with ID ${permission.id}`)
          }
        })
      }
    })

    // No fallback to local constants – if API has no permissions, table remains empty

    // Create a map of role IDs to their index in our roles array for quick lookup
    const roleIndexMap: Record<number, number> = {} // Map role IDs to their index directly from server roles order
    roleItems.forEach((role, index) => {
      roleIndexMap[role.id] = index
    })

    console.log('Role index map:', roleIndexMap)

    // Process each role's permissions
    roleItems.forEach((role) => {
      const roleIndex = roleIndexMap[role.id]
      if (roleIndex === undefined) {
        console.log(`Role ${role.name} (ID: ${role.id}) not found in roleIndexMap`)
        return
      }

      if (!role.permissions || !Array.isArray(role.permissions)) {
        console.log(`No permissions found for role ${role.name} (ID: ${role.id})`)
        return
      }

      console.log(
        `Processing permissions for role ${role.name} (ID: ${role.id}, index: ${roleIndex})`,
        role.permissions
      )

      // For each permission in this role, mark it as enabled
      role.permissions.forEach((permission) => {
        // Try to match by code first, then by description
        const permCode = permission.code || ''
        const permDescription = permission.description || ''

        // Look up permission by code first, then by label if needed
        let permKey = permCode.toLowerCase()

        // If we don't have it by code, try to find a matching permission by description
        if (!permissionMap[permKey]) {
          const normalizedDesc = permDescription.toLowerCase().replace(/\s+/g, '_')

          // Check if we have this permission by normalized description
          if (permissionMap[normalizedDesc]) {
            permKey = normalizedDesc
          } else {
            // Try to find by ID
            const permById = Object.values(permissionMap).find((p) => p.id === permission.id)
            if (permById) {
              // Find the key for this permission
              const foundKey = Object.keys(permissionMap).find((key) => permissionMap[key].id === permission.id)
              if (foundKey) {
                permKey = foundKey
              }
            }
          }
        }

        // If the permission key exists in our map, update its assigned status for this role
        if (permissionMap[permKey]) {
          // Update the permission status for this role based on the assigned flag
          const perm = permissionMap[permKey]
          const newValues = [...perm.values]
          // If API doesn't provide 'assigned', consider presence in list as true
          const isAssigned = permission.assigned !== undefined ? !!permission.assigned : true
          newValues[roleIndex] = isAssigned
          permissionMap[permKey] = {
            ...perm,
            values: newValues,
            id: permission.id || perm.id, // Keep the server ID if available
          }

          if (permission.assigned) {
            console.log(`Enabled permission ${perm.label} for role ${role.name}`)
          }
        } else {
          console.log(`Permission ${permDescription || permCode} (ID: ${permission.id}) not found in permissionMap`)
        }
      })
    })

    // Convert the map back to array and sort by label
    // Order them to match what's shown in the image:
    // "Візити" should come first, then other permissions
    const preferredOrder = [
      'візити',
      'бачить_тільки_своє',
      'блокування_видалення_не_своїх_даних',
      'дозволити_експорт',
      'дозволити_імпорт',
      'дозволити_масове_редагування',
      'пацієнти',
      'повне_блокування_видалення',
    ]

    const newPermissions = Object.values(permissionMap).sort((a, b) => {
      const aCode = a.code?.toLowerCase() || a.label.toLowerCase().replace(/\s+/g, '_')
      const bCode = b.code?.toLowerCase() || b.label.toLowerCase().replace(/\s+/g, '_')

      // If both are in our preferred order, sort by that
      const aIndex = preferredOrder.indexOf(aCode)
      const bIndex = preferredOrder.indexOf(bCode)

      if (aIndex >= 0 && bIndex >= 0) {
        return aIndex - bIndex
      } else if (aIndex >= 0) {
        return -1 // a is in preferred order, b is not
      } else if (bIndex >= 0) {
        return 1 // b is in preferred order, a is not
      }

      // Otherwise sort alphabetically
      return a.label.localeCompare(b.label)
    })

    setLocalPermissions(newPermissions)
  }, [roleItems])

  useEffect(() => {
    dispatch(getClinicRefercies())
    dispatch(getAllRoles())
  }, [dispatch])

  // When role data changes, update local permissions
  useEffect(() => {
    if (roleItems.length) {
      mapApiPermissionsToLocal()
    }
  }, [roleItems, mapApiPermissionsToLocal])

  const handleAddRole = () => {
    setOpenAddRoleDialog(true)
  }

  const handleTogglePermission = async (permissionIndex: number, roleIndex: number) => {
    // Store current state before changes for potential reversion
    const currentPermissions = [...localPermissions]
    const currentValue = currentPermissions[permissionIndex].values[roleIndex]
    const newValue = !currentValue

    // Get the role and permission details
    const role = roleItems[roleIndex]
    if (!role) {
      console.error('Role not found at index:', roleIndex)
      dispatch(getCurrentUserNotification('Помилка: роль не знайдена'))
      return
    }

    const permission = currentPermissions[permissionIndex]
    console.log('permission', permission)

    if (!permission) {
      console.error('Permission not found at index:', permissionIndex)
      dispatch(getCurrentUserNotification('Помилка: дозвіл не знайдений'))
      return
    }

    // Check if we have a permission ID
    if (!permission.id) {
      console.error('Permission ID is missing')
      dispatch(getCurrentUserNotification('Помилка: дозвіл не має ідентифікатора'))
      return
    }

    // Optimistically update the UI
    setLocalPermissions((prevPermissions) => {
      const newPermissions = [...prevPermissions]
      const newValues = [...newPermissions[permissionIndex].values]
      newValues[roleIndex] = newValue
      newPermissions[permissionIndex] = {
        ...newPermissions[permissionIndex],
        values: newValues,
      }
      return newPermissions
    })

    // Find the actual permission ID from the role's permissions
    const rolePermission = role.permissions?.find(
      (p) =>
        (p.code && p.code.toLowerCase() === (permission.code || '').toLowerCase()) ||
        (p.description && p.description.toLowerCase() === permission.label.toLowerCase())
    )

    // Use the ID from the role's permission if available, otherwise fall back to our local ID
    const permissionId = rolePermission?.id || permission.id

    // Prepare permission to send to API
    const permissionToSend: IRolePermition = {
      code: permission.code || permission.label.toLowerCase().replace(/\s+/g, '_'),
      description: permission.label,
      assigned: newValue,
      id: permissionId, // Use the actual permission ID from the role
    }

    console.log(`Permission to send: ID=${permissionId}, code=${permission.code}, assigned=${newValue}`)

    // Log detailed information for debugging
    console.log('Target Permission:', permission)
    console.log('Found Role Permission:', rolePermission)

    // Log each role to help debugging
    roleItems.forEach((r) => {
      console.log(`Role ${r.name} (ID: ${r.id})`)
      if (r.permissions) {
        r.permissions.forEach((p) => {
          console.log(`  - Permission: ${p.description} (ID: ${p.id}, code: ${p.code}, assigned: ${p.assigned})`)
        })
      }
    })

    await dispatch(setRolePermissions(role.id, [permissionToSend]))

    dispatch(
      getCurrentUserNotification(
        `Дозвіл "${permission.label}" для ролі "${role.name}" ${newValue ? 'надано' : 'відкликано'}`
      )
    )
  }

  const handleRoleSaved = () => {
    // Refresh the role data after saving
    dispatch(getAllRoles())
    dispatch(getClinicRefercies())
  }

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 2,
        }}>
        <PrimaryButton
          startIcon={<PlusIcon />}
          sx={{
            padding: '4px 16px',
            fontSize: 13,
          }}
          onClick={handleAddRole}>
          {t('workers:addRole.addButton')}
        </PrimaryButton>
      </Box>

      <EnhancedPermissionsTable
        permissions={localPermissions}
        totalRows={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        onTogglePermission={handleTogglePermission}
        roleNames={roleNames}
      />

      <AddRoleDialog open={openAddRoleDialog} onClose={() => setOpenAddRoleDialog(false)} onSave={handleRoleSaved} />
    </Box>
  )
}
