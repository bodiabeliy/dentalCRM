import { useState, useEffect, useMemo, type SetStateAction } from 'react'
import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import PlusIcon from '../../../../shared/assets/icons/plus.svg?react'
import { SearchField, PrimaryButton } from '../../../../shared/components'
import { StuffsTable, EditStaffForm } from '../../ui'
import { AddBranchDialog } from '../../ui/add-branch'
import { EditBranchDialog } from '../../ui/edit-branch'
import { DeleteBranchDialog } from '../../ui/delete-branch'
import { BackBtn } from '../../../back-btn'
import type { IStaff } from '../../../../app/providers/types/stuff'
import { getAllStuffs, getStaffById } from '../../../../app/services/StaffService'
import { useAppDispatch, useAppSelector } from '../../../../app/providers/store-helpers'
import { getCurrentStuff, staffsSelector } from '../../../../app/providers/reducers/StaffSlice'
import { SearchAndInviteModal } from '../../search-and-invite-modal/search-and-invite-modal'
import { clinicSelector } from '../../../../app/providers/reducers/ClinicSlice'
import { DeleteStaffModal } from '../../delete-modal'
import { BrancesTable } from '../../ui/brances-table'
import { getAllSubClinics } from '../../../../app/services/SubClinicService'
import { subClinicSelector } from '../../../../app/providers/reducers/SubClinicSlice'
import type { ISubClinic } from '../../../../app/providers/types/clinic'
import { PermissionsManagement } from '../permissions-management'
import { getAllRoles } from '../../../../app/services/RoleService'
import { useTranslation } from 'react-i18next'

export function StuffsManagement({ setSubtitle }: { setSubtitle: (subtitle: string) => void }) {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingStuff, setEditingStuff] = useState<IStaff | null>(null)
  const [openAddBranchDialog, setOpenAddBranchDialog] = useState(false)
  const [openEditBranchDialog, setOpenEditBranchDialog] = useState(false)
  const [openDeleteBranchDialog, setOpenDeleteBranchDialog] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<ISubClinic | null>(null)

  // const [roles, setRoles] = useState<IStaffRole[]>([{id:1, name: 'Лікар' }, {
  //   name: '',
  //   id: 0
  // }])

  // const [staffs, setStuffs] = useState<IStaff[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [brances, setBrances] = useState<ISubClinic[]>([])
  const [totalBrancesRows, setTotalBrancesRows] = useState(0)
  const [brancesPage, setBrancesPage] = useState(0)
  const [brancesRowsPerPage, setBrancesRowsPerPage] = useState(10)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()

  const staffList = useAppSelector(staffsSelector)

  const currentClinic = useAppSelector(clinicSelector)
  const { t } = useTranslation(['workers', 'common'])

  // const totalStuffRows = useAppSelector(totalRowsSelector)

  const [createActionsModal, setCreateActionsModal] = useState(false)
  const [deleteActionsModal, setDeleteActionsModal] = useState(false)

  const filteredStaff = useMemo(() => {
    let filtered = staffList

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (staff: IStaff) => staff.firstname.toLowerCase().includes(query) || staff.email.includes(query)
      )
    }
    return filtered
  }, [searchQuery, staffList])

  const paginatedStaffs = useMemo(() => {
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return filteredStaff.slice(startIndex, endIndex)
  }, [filteredStaff, page, rowsPerPage])

  const totalRows = filteredStaff.length

  useEffect(() => {
    dispatch(getAllStuffs())
    dispatch(getAllSubClinics())
    dispatch(getAllRoles())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllStuffs())
    dispatch(getAllRoles())
  }, [dispatch, currentClinic])

  // Get subClinics data from Redux store
  const subClinics = useAppSelector(subClinicSelector)

  // Transform subClinics to Brance format when subClinics change
  useEffect(() => {
    if (subClinics && subClinics.length > 0) {
      console.log('Transforming subClinics to branches:', subClinics.length)

      const transformedBrances: ISubClinic[] = subClinics?.map((subClinic) => ({
        id: subClinic.id,
        name: subClinic.name,
        usersCount: 0, // Set a default value or calculate if available
        address: subClinic.address || '',
      }))

      console.log('Transformed branches:', transformedBrances.length)
      setBrances(transformedBrances)
      setTotalBrancesRows(transformedBrances.length)
    } else {
      console.log('No subClinics available')
      setBrances([])
      setTotalBrancesRows(0)
    }
  }, [subClinics])

  const handleBackToStuffs = () => setEditingStuff(null)

  const handleEditStuff = (staff: IStaff) => {
    setEditingStuff(staff)
    dispatch(getStaffById(staff))
    setSubtitle(t('workers:subtitle.edit', { name: staff.firstname }))
  }

  const handleDeleteStuff = async (staff: IStaff) => {
    console.log('staff', staff)

    setDeleteActionsModal(true)
    dispatch(getCurrentStuff(staff))

    // dispatch(deleteStuffProfile(id))
    // setStuffs(staffList)
    // setTotalRows(totalStuffRows)
  }

  const handleSaveStuff = async (staff: IStaff) => {
    console.log('Staff saved:', staff)
    // Update our local state with the updated staff information
    setEditingStuff(null) // Close the edit form

    // Refresh the staff list to ensure we have the latest data
    dispatch(getAllStuffs())

    // Set the subtitle back to default
    setSubtitle(t('workers:subtitle.list'))
  }

  // const handleSaveRoles = () => {
  //   console.log('Saving roles:', roles)
  // }

  const handleSaveBranch = (branch: ISubClinic) => {
    console.log('Saving branch:', branch)
    setOpenAddBranchDialog(false)
    // Refresh the subclinic list to show the newly added branch
    dispatch(getAllSubClinics())
  }

  const handleEditBranch = (branch: ISubClinic) => {
    setSelectedBranch(branch)
    setOpenEditBranchDialog(true)
  }

  const handleDeleteBranch = (branch: ISubClinic) => {
    setSelectedBranch(branch)
    setOpenDeleteBranchDialog(true)
  }

  useEffect(() => {
    if (!editingStuff) {
      setSubtitle(t('workers:subtitle.list'))
    }
  }, [editingStuff, setSubtitle, t])

  const handleAddStuff = () => {
    setCreateActionsModal(true)
  }

  const handleCreateActionsSave = (data: IStaff) => {
    console.log('Create actions saved:', data)
  }

  const settingUpActiveTab = (newValue: SetStateAction<number>) => {
    setActiveTab(newValue)
    handleBackToStuffs()
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isMobile || editingStuff ? 'space-between' : 'end',
          px: isMobile ? 2 : 0,
        }}>
        {editingStuff ? <BackBtn handleBack={handleBackToStuffs} /> : null}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => settingUpActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#0029d9',
            },
            '&.Mui-selected': {
              color: '#0029d9',
            },
          }}>
          {[t('workers:tabs.workers'), t('workers:tabs.roles'), t('workers:tabs.branches')]?.map((label) => (
            <Tab
              key={label}
              sx={{
                '&.Mui-selected': {
                  color: '#0029d9',
                },
                textTransform: 'none',
              }}
              label={label}
            />
          ))}
        </Tabs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxShadow:
            '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
          background: '#fff',
          borderRadius: '16px',
          mt: isMobile ? 0 : 2,
          position: 'relative',
        }}>
        {activeTab === 0 && (
          <Box sx={{ display: editingStuff ? 'none' : 'block' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: isMobile ? 'flex-end' : 'space-between',
                alignItems: 'center',
                p: isMobile ? 1 : 3,
              }}>
              {!isMobile ? <SearchField value={searchQuery} onChange={setSearchQuery} fullWidth={false} /> : null}
              <PrimaryButton onClick={handleAddStuff} startIcon={<PlusIcon />}>
                {t('common:actions.add')}
              </PrimaryButton>
            </Box>
            <StuffsTable
              staffs={paginatedStaffs}
              totalRows={totalRows}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowsPerPageChange={setRowsPerPage}
              onEdit={handleEditStuff}
              onDelete={handleDeleteStuff}
            />
          </Box>
        )}
        {activeTab === 1 && (
          <Box sx={{ height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: isMobile ? 0 : 2,
                p: isMobile ? 1 : 3,
              }}></Box>
            {/* Using the PermissionsManagement component instead of the old PermissionsTable */}
            <Box sx={{ px: 3, pb: 3 }}>
              <PermissionsManagement />
            </Box>
          </Box>
        )}
        {activeTab === 2 && (
          <Box sx={{ height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                mb: isMobile ? 0 : 2,
                p: isMobile ? 1 : 3,
              }}>
              <PrimaryButton
                startIcon={<PlusIcon />}
                sx={{
                  padding: '4px 16px',
                  fontSize: 13,
                }}
                onClick={() => setOpenAddBranchDialog(true)}>
                {t('workers:branches.addButton')}
              </PrimaryButton>
            </Box>
            <BrancesTable
              brances={brances}
              totalRows={totalBrancesRows}
              page={brancesPage}
              rowsPerPage={brancesRowsPerPage}
              onPageChange={setBrancesPage}
              onRowsPerPageChange={setBrancesRowsPerPage}
              onEdit={handleEditBranch}
              onDelete={handleDeleteBranch}
            />
          </Box>
        )}
        {editingStuff && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <EditStaffForm staff={editingStuff} onCancel={handleBackToStuffs} onSave={handleSaveStuff} />
          </Box>
        )}
      </Box>

      {/* <RoleDialog
        open={openRoleDialog}
        onClose={() => setOpenRoleDialog(false)}
        roles={roles}
        onRolesChange={setRoles}
        onSave={handleSaveRoles}
      /> */}
      <AddBranchDialog
        open={openAddBranchDialog}
        onClose={() => setOpenAddBranchDialog(false)}
        onSave={handleSaveBranch}
      />
      <EditBranchDialog
        open={openEditBranchDialog}
        branch={selectedBranch}
        onClose={() => {
          setOpenEditBranchDialog(false)
          dispatch(getAllSubClinics())
        }}
        onSave={(branch) => {
          console.log('Updated branch:', branch)
          setOpenEditBranchDialog(false)
          dispatch(getAllSubClinics())
        }}
      />
      <DeleteBranchDialog
        open={openDeleteBranchDialog}
        branch={selectedBranch}
        onClose={() => {
          setOpenDeleteBranchDialog(false)
          dispatch(getAllSubClinics())
        }}
      />
      <SearchAndInviteModal
        open={createActionsModal}
        onClose={() => setCreateActionsModal(false)}
        onSave={handleCreateActionsSave}
      />
      <DeleteStaffModal
        open={deleteActionsModal}
        onClose={() => setDeleteActionsModal(false)}
        onSave={handleCreateActionsSave}
      />
    </>
  )
}
