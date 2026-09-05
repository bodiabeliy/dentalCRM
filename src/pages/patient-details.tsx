import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { SidebarLayout } from '../shared'
import { PatientDetailsWidget } from '../widgets/patient-details'
import { PatientDetailsActions } from '../features/patient-details'
import { mockPatients } from '../features/patients/model/constants'

export function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const patient = mockPatients.find((p: any) => p.id === id)

  if (!patient) {
    return (
      <SidebarLayout title="Пацієнт не знайдено" rightSidebar={<PatientDetailsActions />}>
        <Box sx={{ p: 4 }}>
          <Typography>Пацієнт з ID {id} не знайдено</Typography>
        </Box>
      </SidebarLayout>
    )
  }

  const handleUsersClick = () => {
    // TODO: Implement users action
    console.log('Users clicked')
  }

  const handleEditClick = () => {
    // TODO: Implement edit action
    console.log('Edit clicked')
  }

  const handleBellClick = () => {
    // TODO: Implement bell action
    console.log('Bell clicked')
  }

  return (
    <SidebarLayout
      title="Пацієнти"
      subtitle={patient.name}
      rightSidebar={
        <PatientDetailsActions
          onUsersClick={handleUsersClick}
          onEditClick={handleEditClick}
          onBellClick={handleBellClick}
        />
      }>
      <PatientDetailsWidget patient={patient} />
    </SidebarLayout>
  )
}
