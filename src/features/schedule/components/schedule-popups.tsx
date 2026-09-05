import { AppointmentModal } from '../../calendar/components/appointment-modal'
import { EditEventModal } from '../../calendar/components/edit-event-modal'
import { AddEventModal } from '../../calendar/components/add-event-modal'
import CreateShiftModal from './create-shift-modal'
import ReserveTimeModal from './reserve-time-modal'
import { useModals } from '../../../shared/contexts/modal-context'
import { useSchedule } from '../contexts/schedule-context'
import type { Event } from '../types/schedule-types'
import { addReservedTimeToShift } from '../api/shifts-api'

interface SchedulePopupsProps {
  clearSearchQuery?: () => void
}

export function SchedulePopups({ clearSearchQuery }: SchedulePopupsProps) {
  const {
    appointmentModal,
    editModal,
    addEventModal,
    createShiftModal,
    reserveTimeModal,
    closeAppointmentModal,
    closeEditModal,
    closeAddEventModal,
    closeCreateShiftModal,
    closeReserveTimeModal,
  } = useModals()

  const { handleSaveEvent, handleDeleteEvent, handleCreateEvent, refetchScheduleData } = useSchedule()

  const handleSaveEventWrapper = async (updatedEvent: Event) => {
    try {
      await handleSaveEvent(updatedEvent)
      closeEditModal()
    } catch (error) {
      console.error('Failed to save event:', error)
    }
  }

  const handleDeleteEventWrapper = async (eventId: number) => {
    try {
      await handleDeleteEvent(eventId)
      closeEditModal()
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const handleCreateEventWrapper = async (newEvent: Omit<Event, 'id'>) => {
    try {
      await handleCreateEvent(newEvent)
      await refetchScheduleData()
      if (clearSearchQuery) clearSearchQuery()
      closeAddEventModal()
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  const handleReserveTime = async (data: { type: string; start: Date; end: Date; comment?: string; date: Date }) => {
    // Find the shiftId from reserveTimeModal.shiftId
    if (!reserveTimeModal.shiftId) return
    await addReservedTimeToShift(reserveTimeModal.shiftId, {
      type: data.type,
      start: data.start.toISOString(),
      end: data.end.toISOString(),
      comment: data.comment,
    })
    closeReserveTimeModal()
    await refetchScheduleData()
  }

  const handleCreateShift = async () => {
    closeCreateShiftModal()
    await refetchScheduleData()
  }

  return (
    <>
      {appointmentModal.isOpen && appointmentModal.event && (
        <AppointmentModal
          open={appointmentModal.isOpen}
          onClose={closeAppointmentModal}
          patient={{
            name: appointmentModal.event.patient.name,
            avatar: appointmentModal.event.patient.avatar || '',
            age: 29,
            phone: '+380(11)111-11-11',
          }}
          doctor={{
            name: appointmentModal.event.doctor.name,
          }}
          date={appointmentModal.event.date}
          time={appointmentModal.event.time}
          status={appointmentModal.event.status}
          note={appointmentModal.event.note || ''}
          advance={200.0}
        />
      )}
      {editModal.isOpen && editModal.event && (
        <EditEventModal
          open={editModal.isOpen}
          onClose={closeEditModal}
          onSave={handleSaveEventWrapper}
          onDelete={handleDeleteEventWrapper}
          event={editModal.event}
        />
      )}
      {addEventModal.isOpen && (
        <AddEventModal
          open={addEventModal.isOpen}
          onClose={closeAddEventModal}
          onSave={handleCreateEventWrapper}
          initialDate={addEventModal.initialDate}
          initialTime={addEventModal.initialTime}
          initialCabinetId={addEventModal.initialCabinetId}
        />
      )}
      {createShiftModal.isOpen && (
        <CreateShiftModal open={createShiftModal.isOpen} onClose={closeCreateShiftModal} onSave={handleCreateShift} />
      )}
      {reserveTimeModal.isOpen && (
        <ReserveTimeModal open={reserveTimeModal.isOpen} onClose={closeReserveTimeModal} onSave={handleReserveTime} />
      )}
    </>
  )
}
