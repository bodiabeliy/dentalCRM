import { useState } from 'react'
import { Box } from '@mui/material'
import { DocumentEditor } from '../../shared/ui/document-editor'
import { PatientDocumentsTable } from '../patient-documents-table'
import { PatientVisitsList } from '../patient-visits-list'
import { TreatmentPlansWidget } from '../../features/treatment-plans'
import { PatientFinancesWidget } from '../../features/patient-finances'
import { PatientChatWidget } from './ui/patient-chat-widget'
import { PatientHistoryWidget } from './ui/patient-history-widget'
import { PatientHeader } from './ui/patient-header'
import { CallHistoryTab } from './ui/call-history-tab'
import {
  mockDocuments,
  mockDocumentTemplates,
  mockMozForms,
  mockVisits,
  mockReminders,
  getIconComponent,
} from './model/constants.tsx'
import type { Patient } from '../../entities/patient'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      style={{ height: '100%' }}
      {...other}>
      {value === index && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  )
}

interface PatientDetailsWidgetProps {
  patient: Patient
}

export function PatientDetailsWidget({ patient }: PatientDetailsWidgetProps) {
  const [tabValue, setTabValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const [showDocumentEditor, setShowDocumentEditor] = useState(false)
  const [currentPatient, setCurrentPatient] = useState(patient)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleStatusChange = (status: Patient['status']) => {
    setCurrentPatient((prev) => ({ ...prev, status }))
    // TODO: Implement actual status update logic
    console.log('Status changed to:', status)
  }

  const handleCreateDocument = () => {
    setShowDocumentEditor(true)
  }

  const handleCloseDocumentEditor = () => {
    setShowDocumentEditor(false)
  }

  const handleSaveDocument = () => {
    // TODO: Implement document saving logic
    console.log('Saving document...')
    setShowDocumentEditor(false)
  }

  const handlePrintDocument = () => {
    // TODO: Implement document printing logic
    console.log('Printing document...')
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <PatientHeader
        patient={currentPatient}
        tabValue={tabValue}
        onTabChange={handleTabChange}
        onStatusChange={handleStatusChange}
      />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <TabPanel value={tabValue} index={0}>
          {showDocumentEditor ? (
            <DocumentEditor
              onClose={handleCloseDocumentEditor}
              onSave={handleSaveDocument}
              onPrint={handlePrintDocument}
            />
          ) : (
            <PatientDocumentsTable
              documents={mockDocuments}
              documentTemplates={mockDocumentTemplates}
              mozForms={mockMozForms}
              onCreateDocument={handleCreateDocument}
            />
          )}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <PatientVisitsList
            visits={mockVisits.map((v) => ({ ...v, icon: getIconComponent(v.icon) }))}
            reminders={mockReminders}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <TreatmentPlansWidget />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <PatientHistoryWidget patientId={patient.id} />
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <PatientFinancesWidget />
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          <PatientChatWidget patientId={patient.id} />
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          <CallHistoryTab />
        </TabPanel>
      </Box>
    </Box>
  )
}
