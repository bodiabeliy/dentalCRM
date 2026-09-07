import { useEffect, useState } from 'react'
import { Dialog, DialogContent, Box, Typography, Button, Paper } from '@mui/material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import WorkerIcon from '../../../../shared/assets/icons/settings/workers.svg?react'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { getClinicRefercies } from '../../../../app/services/ClinicService'
import { getAllRoles } from '../../../../app/services/RoleService'
import { clinicRefernciesSelector } from '../../../../app/providers/reducers/ClinicSlice'
import type { IClinicReferences } from '../../../../app/providers/types/clinic'
import { rolesSelector } from '../../../../app/providers/reducers/RoleSlice'
import { updateRole } from '../../../../app/services/RoleService'
import type { IRole } from '../../../../app/providers/types/role'

interface RoleValue {
  value: string
}

interface RoleDialogProps {
  open: boolean
  onClose: () => void
  roles: RoleValue[]
  onRolesChange: (roles: RoleValue[]) => void
  onSave: () => void
}

type SortableRole = { id: string; name: string }

export function RoleDialog({ open, onClose, roles, onRolesChange, onSave }: RoleDialogProps) {
  const dispatch = useAppDispatch()
  const clinicRefs: IClinicReferences = useAppSelector(clinicRefernciesSelector)
  const roleState = useAppSelector(rolesSelector)
  const currentRoles = (roleState?.items || []) as IRole[]
  const [items, setItems] = useState<SortableRole[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)

  // Load clinic references (roles) when opening the dialog
  useEffect(() => {
    if (open) {
      dispatch(getClinicRefercies())
      dispatch(getAllRoles())
    }
  }, [open, dispatch])

  // Whenever references update or dialog opens, seed local items list
  useEffect(() => {
    if (!open) return
    const rolesFromRefs = (clinicRefs.roles || [])?.map((r) => ({ id: r.id, name: r.name }))
    if (rolesFromRefs.length) {
      setItems(rolesFromRefs)
    } else {
      // fallback to provided roles prop if references are empty (maps value->name)
      const fallback = (roles || [])?.map((r, idx) => ({ id: String(idx), name: r.value }))
      setItems(fallback)
    }
  }, [clinicRefs.roles, open, roles])

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

  const handleSave = async () => {
    // Map reordered items back to caller's expected shape
    const mapped: RoleValue[] = items?.map((it) => ({ value: it.name }))

    // Compute new order and update only changed ones using RoleService.updateRole
    const updates: Promise<unknown>[] = []
    items.forEach((it, idx) => {
      const target = currentRoles.find((r) => r.name === it.name)
      if (!target) return
      const newOrder = idx + 1
      if (target.order !== newOrder) {
        updates.push(dispatch(updateRole({ ...target, order: newOrder } as IRole)) as unknown as Promise<unknown>)
      }
    })

    if (updates.length) {
      try {
        await Promise.all(updates)
      } catch {
        // ignore; notifications handled in service
      }
    }

    onRolesChange(mapped)
    onSave()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, background: '#f4f7fe' }}>
        <WorkerIcon style={{ color: '#0029d9', marginRight: 8 }} />
        <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
          Ролі
        </Typography>
      </Box>
      <DialogContent sx={{ pb: 0 }}>
        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, borderColor: '#e5e7eb', background: '#f9fafb' }}>
          {items.length ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }} onDragOver={handleDragOver}>
              {items?.map((item, index) => (
                <Box
                  key={item.id}
                  draggable
                  onDragStart={handleDragStart(index)}
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
          ) : (
            <Typography variant="body2" color="text.secondary">
              Системні ролі відсутні.
            </Typography>
          )}
        </Paper>
      </DialogContent>
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', px: 3, pb: 3, pt: 1 }}>
        <Button
          variant="outlined"
          sx={{ borderColor: '#0029d9', color: '#0029d9', padding: '12px 22px' }}
          onClick={onClose}>
          СКАСУВАТИ
        </Button>
        <Button variant="contained" sx={{ bgcolor: '#0029d9', padding: '12px 22px', flex: 1 }} onClick={handleSave}>
          ЗБЕРЕГТИ
        </Button>
      </Box>
    </Dialog>
  )
}
