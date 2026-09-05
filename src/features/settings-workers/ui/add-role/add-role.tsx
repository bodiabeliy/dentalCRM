import { useState, useCallback, useEffect, useMemo } from 'react'
import { Dialog, DialogContent, Box, Typography, TextField, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import WorkerIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { getAllRoles, updateRole } from '../../../../app/services/RoleService'
import $api from '../../../../app/services/api'
import { token } from '../../../../shared/utils/storageUtils'
import { getCurrentUserNotification } from '../../../../app/providers/reducers/UserSlice'
import { rolesSelector } from '../../../../app/providers/reducers/RoleSlice'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import type { IRole } from '../../../../app/providers/types/role'
import { useTranslation } from 'react-i18next'

interface AddRoleDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}
type SortableRole = { id: number; name: string; order?: number }

export function AddRoleDialog({ open, onClose, onSave }: AddRoleDialogProps) {
  const dispatch = useAppDispatch()
  const rolesList = useAppSelector(rolesSelector)
  const { t } = useTranslation(['workers', 'common', 'notifications', 'errors'])
  const [roles, setRoles] = useState<Array<{ name: string; id?: number }>>([{ name: '' }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [items, setItems] = useState<SortableRole[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  // Fetch roles when the component mounts
  useEffect(() => {
    dispatch(getAllRoles())
  }, [dispatch])

  // Sync draggable items with roles from store when dialog opens or roles change
  useEffect(() => {
    if (open && rolesList?.items?.length) {
      const sorted = [...rolesList.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      setItems(sorted.map((r) => ({ id: r.id as number, name: r.name, order: r.order })))
    } else if (!open) {
      setItems([])
    }
  }, [open, rolesList])

  // Handle change for custom role fields
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRoles = [...roles]
    newRoles[index].name = e.target.value
    setRoles(newRoles)
  }

  const handleAddRole = () => {
    setRoles([...roles, { name: '' }])
  }

  const handleDeleteRole = (index: number) => {
    const newRoles = [...roles]
    newRoles.splice(index, 1)
    setRoles(newRoles)
  }

  const handleSave = useCallback(async () => {
    // Filter out empty roles to create
    const validRoles = roles.filter((role) => role.name.trim() !== '')

    // Check if order changed vs store
    const original = (rolesList?.items ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    const originalIds = original.map((r) => r.id).join(',')
    const currentIds = items.map((i) => i.id).join(',')
    const hasOrderChanged = originalIds !== currentIds

    try {
      setIsSubmitting(true)

      const ops: Promise<unknown>[] = []

      // 1) Persist order changes
      if (hasOrderChanged) {
        items.forEach((it, idx) => {
          const role = (rolesList?.items ?? []).find((r: IRole) => r.id === it.id)
          if (!role) return
          const newOrder = idx + 1 // assuming 1-based order on backend
          if (role.order !== newOrder) {
            const thunk = updateRole({ ...(role as IRole), order: newOrder })
            ops.push(Promise.resolve(dispatch(thunk) as unknown as Promise<unknown>))
          }
        })
      }

      // 2) Optionally create new roles
      if (validRoles.length > 0) {
        ops.push(
          $api.post('/roles', validRoles, {
            headers: { Authorization: token },
          })
        )
      }

      if (ops.length > 0) {
        await Promise.all(ops)
        await dispatch(getAllRoles())
      }

      // Reset form and notify
      setRoles([{ name: '' }])
      dispatch(getCurrentUserNotification(t('notifications:updated', { entity: t('workers:entities.role') })))

      onSave()
      onClose()
    } catch (error: unknown) {
      console.error('Error saving roles/order:', error)
      type ApiError = { response?: { data?: { message?: string } }; message?: string }
      const e = error as ApiError
      const message = e?.response?.data?.message ?? e?.message ?? t('errors.save-failed')
      dispatch(getCurrentUserNotification(t('errors.prefix', { message })))
    } finally {
      setIsSubmitting(false)
    }
  }, [roles, rolesList, items, dispatch, onSave, onClose, t])

  // dragindrop
  const reorder = (list: SortableRole[], startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggingIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => (e: React.DragEvent) => {
    e.preventDefault()
    const fromStr = e.dataTransfer.getData('text/plain')
    const from = Number(fromStr)
    if (Number.isNaN(from) || from === index) return
    setItems((prev) => reorder(prev, from, index))
    setDraggingIndex(null)
  }

  // compute button disabled state: allow save if order changed OR there's a new role
  const hasNewRoles = useMemo(() => roles.some((role) => role.name.trim() !== ''), [roles])
  const hasOrderChanged = useMemo(() => {
    if (!open) return false
    const original = (rolesList?.items ?? []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    if (!original.length || !items.length) return false
    return original.map((r) => r.id).join(',') !== items.map((i) => i.id).join(',')
  }, [open, rolesList, items])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <WorkerIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          {t('workers:addRole.title')}
        </Typography>
      </Box>
      <DialogContent sx={{ p: 3 }}>
        {items.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }} onDragOver={handleDragOver}>
            {items.map((item, index) => (
              <Box
                key={item.id}
                draggable
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={handleDrop(index)}
                sx={{
                  background: '#fff',
                  borderRadius: 2,
                  p: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #e5e7eb',
                  boxShadow: draggingIndex === index ? '0 4px 10px rgba(0,0,0,0.12)' : 'none',
                  cursor: 'grab',
                }}>
                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center', color: '#6b7280' }}>
                  <DragIndicatorIcon />
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {roles.map((role, index) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              backgroundColor: '#f8f9fb',
              borderRadius: '8px',
              p: 0,
            }}>
            <TextField
              placeholder={t('workers:addRole.placeholder')}
              fullWidth
              variant="outlined"
              sx={{
                background: '#fff',
                borderRadius: '8px',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              value={role.name}
              onChange={handleChange(index)}
            />
            <IconButton
              sx={{ color: '#9e9e9e' }}
              disabled={isSubmitting || roles.length <= 1}
              onClick={() => handleDeleteRole(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddRole}
          disabled={isSubmitting}
          sx={{
            mt: 1,
            borderColor: '#7324D580',
            color: '#7324D580',
            borderRadius: '8px',
            padding: '10px 0',
            justifyContent: 'center',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}>
          {t('workers:addRole.addButton')}
        </Button>
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          pb: 3,
          pt: 1,
          gap: 2,
        }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#0029d9',
            color: '#0029d9',
            padding: '12px 22px',
            flex: 1,
            maxWidth: '150px',
          }}
          disabled={isSubmitting}
          onClick={onClose}>
          {t('common:actions.cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#0029d9',
            padding: '12px 22px',
            flex: 1,
          }}
          onClick={handleSave}
          disabled={isSubmitting || (!hasNewRoles && !hasOrderChanged)}>
          {isSubmitting ? t('workers:addRole.saving') : t('common:actions.save')}
        </Button>
      </Box>
    </Dialog>
  )
}
