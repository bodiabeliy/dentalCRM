import { useState, useMemo } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router'
import { SidebarLayout } from '../shared'
import { SearchField } from '../shared/components'
import {
  PatientsTable,
  FilterButton,
  AddPatientButton,
  DeletionModal,
  MassActionsModal,
  SendMessageModal,
} from '../features/patients'
import { FilterSection } from '../features/patients/ui/filter-section/filter-section'
import { SelectionToolbar } from '../features/patients/ui/selection-toolbar/selection-toolbar'
import type { FilterValues } from '../features/patients/ui/filter-section/filter-section'
import { mockPatients } from '../features/patients/model/constants'
import type { Patient } from '../features/patients/model/types'
import type { SendMessageData } from '../features/patients/ui/send-message-modal/send-message-modal'
import type { MassActionsData } from '../features/patients/ui/mass-actions-modal/mass-actions-modal'

export function PatientsPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState('')
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({
    lead: 'По створенню',
    period: '01.09.24',
    branch: '',
    createdBy: '',
    mainResponsible: '',
    status: '',
    tag: '',
    source: '',
    products: '',
    important: '',
    task: '',
    lastCall: '',
    refusalReason: '',
    brand: '',
    paymentAmount: '',
    utmCampaign: '',
    utmSource: 'FACEBOOK_ADS_VIK',
    utmContent: '',
    utmTerm: '',
    ipAddress: '',
    firstCallNumber: '',
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])

  const [deletionModal, setDeletionModal] = useState<{
    open: boolean
    isSingleItem: boolean
    selectedCount: number
  }>({
    open: false,
    isSingleItem: false,
    selectedCount: 0,
  })

  const [massActionsModal, setMassActionsModal] = useState<{
    open: boolean
    isSingleItem: boolean
    selectedCount: number
  }>({
    open: false,
    isSingleItem: false,
    selectedCount: 0,
  })

  const [sendMessageModal, setSendMessageModal] = useState<{
    open: boolean
    isSingleItem: boolean
    selectedCount: number
  }>({
    open: false,
    isSingleItem: false,
    selectedCount: 0,
  })

  const activeFiltersCount = useMemo(() => {
    return Object.values(appliedFilters).filter((value) => value !== '').length
  }, [appliedFilters])

  const filteredPatients = useMemo(() => {
    let filtered = mockPatients

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query) ||
          patient.phoneNumber.includes(query) ||
          patient.comment.toLowerCase().includes(query)
      )
    }

    if (appliedFilters.status) {
      filtered = filtered.filter((patient) => patient.status === appliedFilters.status)
    }

    return filtered
  }, [searchQuery, appliedFilters])

  const paginatedPatients = useMemo(() => {
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return filteredPatients.slice(startIndex, endIndex)
  }, [filteredPatients, page, rowsPerPage])

  const totalRows = filteredPatients.length

  const handleFilterClick = () => {
    setIsFiltersExpanded(!isFiltersExpanded)
  }

  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFilterReset = () => {
    setAppliedFilters({
      lead: 'По створенню',
      period: '01.09.24',
      branch: '',
      createdBy: '',
      mainResponsible: '',
      status: '',
      tag: '',
      source: '',
      products: '',
      important: '',
      task: '',
      lastCall: '',
      refusalReason: '',
      brand: '',
      paymentAmount: '',
      utmCampaign: '',
      utmSource: 'FACEBOOK_ADS_VIK',
      utmContent: '',
      utmTerm: '',
      ipAddress: '',
      firstCallNumber: '',
    })
    setPage(0)
  }

  const handleFilterApply = () => {
    setPage(0)
  }

  const handleAddPatient = () => {
    // TODO: Implement add patient modal
    console.log('Add patient clicked')
  }

  const handleEditPatient = (patient: Patient) => {
    navigate(`/patients/${patient.id}/edit`)
  }

  const handleSendMessage = () => {
    setSendMessageModal({
      open: true,
      isSingleItem: true,
      selectedCount: 1,
    })
  }

  const handleDeletePatient = () => {
    setDeletionModal({
      open: true,
      isSingleItem: true,
      selectedCount: 1,
    })
  }

  const handleSelectAll = () => {
    setSelectedPatients(filteredPatients.map((patient) => patient.id))
  }

  const handleDeleteSelected = () => {
    setDeletionModal({
      open: true,
      isSingleItem: false,
      selectedCount: selectedPatients.length,
    })
  }

  const handleEditSelected = () => {
    setMassActionsModal({
      open: true,
      isSingleItem: false,
      selectedCount: selectedPatients.length,
    })
  }

  const handleSendMessageSelected = () => {
    setSendMessageModal({
      open: true,
      isSingleItem: false,
      selectedCount: selectedPatients.length,
    })
  }

  const handleDeletionConfirm = () => {
    console.log(
      'Deletion confirmed for:',
      deletionModal.isSingleItem ? 'single patient' : `${selectedPatients.length} patients`
    )
    // TODO: Implement actual deletion logic
  }

  const handleMassActionsSave = (data: MassActionsData) => {
    console.log('Mass actions saved:', data)
    // TODO: Implement actual mass actions logic
  }

  const handleSendMessageConfirm = (data: SendMessageData) => {
    console.log('Message sent:', data)
    // TODO: Implement actual message sending logic
  }

  return (
    <SidebarLayout title="Пацієнти" rightSidebar={<></>}>
      <Box
        sx={{
          p: isMobile ? 2 : 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 3,
            alignItems: isMobile ? 'stretch' : 'center',
          }}>
          <Box
            sx={{
              display: isMobile && selectedPatients.length > 0 ? 'none' : 'flex',
              gap: 2,
              alignItems: 'center',
            }}>
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Пошук"
              isStartAdornment={false}
              sx={{
                width: isMobile ? 'min-content' : 'auto',
                padding: isMobile ? '0' : '0 16px',
                '& .MuiInputAdornment-root': {
                  marginLeft: isMobile ? '0' : '8px',
                },
                '& .MuiInputBase-root': {
                  padding: isMobile ? '16px' : '0 16px',
                },
              }}
            />
            <FilterButton
              activeFilters={activeFiltersCount}
              isExpanded={isFiltersExpanded}
              onClick={handleFilterClick}
            />
          </Box>
          <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
            <SelectionToolbar
              selectedCount={selectedPatients.length}
              onSelectAll={handleSelectAll}
              onDelete={handleDeleteSelected}
              onEdit={handleEditSelected}
              onSendMessage={handleSendMessageSelected}
            />
            <Box
              sx={{
                display: isMobile && selectedPatients.length > 0 ? 'none' : 'block',
              }}>
              <AddPatientButton onClick={handleAddPatient} />
            </Box>
          </Box>
        </Box>
        {isFiltersExpanded && (
          <FilterSection
            filters={appliedFilters}
            onFilterChange={handleFilterChange}
            onReset={handleFilterReset}
            onApply={handleFilterApply}
          />
        )}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            boxShadow:
              '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
          <PatientsTable
            patients={paginatedPatients}
            totalRows={totalRows}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            selectedPatients={selectedPatients}
            onSelectionChange={setSelectedPatients}
            onSendMessage={handleSendMessage}
            onDeletePatient={handleDeletePatient}
            onEditPatient={handleEditPatient}
          />
        </Box>
      </Box>
      <DeletionModal
        open={deletionModal.open}
        onClose={() => setDeletionModal({ ...deletionModal, open: false })}
        onConfirm={handleDeletionConfirm}
        selectedCount={deletionModal.selectedCount}
        isSingleItem={deletionModal.isSingleItem}
      />
      <MassActionsModal
        open={massActionsModal.open}
        onClose={() => setMassActionsModal({ ...massActionsModal, open: false })}
        onSave={handleMassActionsSave}
        selectedCount={massActionsModal.selectedCount}
      />
      <SendMessageModal
        open={sendMessageModal.open}
        onClose={() => setSendMessageModal({ ...sendMessageModal, open: false })}
        onSend={handleSendMessageConfirm}
      />
    </SidebarLayout>
  )
}
