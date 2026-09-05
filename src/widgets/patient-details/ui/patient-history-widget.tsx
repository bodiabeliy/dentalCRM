import { useState } from 'react'
import { Box, Typography, Checkbox, useMediaQuery, useTheme } from '@mui/material'
import LinkIcon from '../../../shared/assets/icons/link.svg?react'
import FileIcon from '../../../shared/assets/icons/file.svg?react'
import Teeth1 from '../../../shared/assets/images/teeth-1.png'
import Teeth2 from '../../../shared/assets/images/teeth-2.png'
import Teeth3 from '../../../shared/assets/images/teeth-3.png'
import Teeth4 from '../../../shared/assets/images/teeth-4.png'
import Teeth5 from '../../../shared/assets/images/teeth-5.png'
import { ImageModal } from './image-modal'
import { MentionTextField } from './mention-textfield'
import ChevronIcon from '../../../shared/assets/icons/chevron.svg?react'
import DeleteIcon from '../../../shared/assets/icons/trash.svg?react'
import CloseIcon from '@mui/icons-material/Close'
import { ConfirmDeleteDialog } from '../../../features/schedule/components/confirm-delete-dialog'
import { MedicalRecordSection } from './medical-record-section'
import { Avatar } from '../../../shared/components/ui/avatar/avatar'
import AttachIcon from '../../../shared/assets/icons/clip.svg?react'
import { UploadFileModal } from './upload-file-modal'

interface PatientHistoryWidgetProps {
  patientId: string
}

const mockImages = [Teeth1, Teeth2, Teeth3, Teeth4, Teeth5]

export const mockMedicalRecords = {
  id: '1',
  doctorName: 'Олексій Ігорович',
  doctorAvatar: 'https://via.placeholder.com/150',
  date: '07.09.2024',
  time: '17:30',
  sections: {
    complaints: 'На наявність нальоту, чутливість зліва зверху',
    anamnesis: 'Проф гігієна рік тому',
    objective:
      "На зубах обох щелеп наявний твердий та м'який пігментований та непігментований наліт. Карієс 17, 36 зубів. Зуб 48 велика пломба, що втратила свій герметизм",
    diagnosis: 'Катаральний гінгівіт',
    treatment: 'Ізоляція Оптрагейт, зняття м`якого нальоту NKS Classic, та твердого NKS УЗ. Рем терапія',
    recommendations: 'Проф гігієна кожні 6 міс. Лікування 17, 36 зубів. Видалення 48 з',
  },
}

// @ts-ignore
export function PatientHistoryWidget({ patientId }: PatientHistoryWidgetProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{ src: string } | null>(null)
  const [comment1, setComment1] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [collapsedVisits, setCollapsedVisits] = useState<{ [key: string]: boolean }>({})
  const [uploadFileModalOpen, setUploadFileModalOpen] = useState(false)

  const handleUploadFileModalClose = () => {
    setUploadFileModalOpen(false)
  }

  const handleImageClick = (src: string) => {
    setSelectedImage({ src })
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedImage(null)
  }

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleChevronClick = (visitId: string) => {
    setCollapsedVisits((prev) => ({
      ...prev,
      [visitId]: !prev[visitId],
    }))
  }

  const isVisitCollapsed = (visitId: string) => collapsedVisits[visitId] || false

  return (
    <>
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteDialogClose}
        title="Підтвердження видалення"
        description="Ви дійсно хочете видалити запис лікування?"
      />
      <UploadFileModal
        open={uploadFileModalOpen}
        onClose={handleUploadFileModalClose}
        onConfirm={handleUploadFileModalClose}
      />
      <Box sx={{ m: 2, p: 0 }}>
        <Box
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 3px -1px rgba(0,0,0,0.1), 0 1px 12px 0 rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
          <Box
            sx={{ p: 2, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 16, display: 'inline' }}>Візит 1</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(21, 22, 24, 0.6)', ml: 1, display: 'inline' }}>
                  07.09.2024 17:30
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2">
                  Лікар: <span style={{ color: 'rgba(21, 22, 24, 0.6' }}>Олекса Олексій Ігорович</span>
                </Typography>
                <Typography variant="body2">
                  Асистент: <span style={{ color: 'rgba(21, 22, 24, 0.6' }}>Олекса Олексій Ігорович</span>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChevronIcon
                style={{
                  width: 24,
                  height: 24,
                  color: 'rgba(21, 22, 24, 0.6)',
                  transform: isVisitCollapsed('visit1') ? 'rotate(0deg)' : 'rotate(180deg)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onClick={() => handleChevronClick('visit1')}
              />
              <DeleteIcon
                style={{
                  width: 24,
                  height: 24,
                  color: 'rgba(21, 22, 24, 0.6)',
                  cursor: 'pointer',
                }}
                onClick={handleDeleteDialogOpen}
              />
            </Box>
          </Box>
          {!isVisitCollapsed('visit1') && (
            <Box sx={{ background: '#e6e9f7', p: 2, pt: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                  gap: isMobile ? 2 : 0,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    width: isMobile ? '100%' : 'auto',
                  }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ color: '#7324d5', fontSize: 15, mb: 0.5, cursor: 'pointer' }}>
                      Виконані маніпуляції
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: '#222' }}>
                      Профілактична гігієна; Ремінералізуюча аплікація
                    </Typography>
                  </Box>
                  <DeleteIcon
                    style={{
                      width: 24,
                      height: 24,
                      color: 'rgba(21, 22, 24, 0.6)',
                      display: isMobile ? 'block' : 'none',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: 'flex-end',
                    width: isMobile ? '100%' : 'auto',
                  }}>
                  <DeleteIcon
                    style={{
                      width: 24,
                      height: 24,
                      color: 'rgba(21, 22, 24, 0.6)',
                      display: isMobile ? 'none' : 'block',
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: '#0029d9', fontSize: 14, cursor: 'pointer' }}>
                      Акт виконаних робіт
                    </Typography>
                    <LinkIcon style={{ width: 16, height: 16, color: '#0029d9' }} />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(6, 1fr)', mt: 2, gap: 1 }}>
                {mockImages.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      '&:hover .close-button': {
                        opacity: 1,
                        visibility: 'visible',
                      },
                    }}>
                    <img
                      src={image}
                      alt="Teeth"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => handleImageClick(image)}
                    />
                    <Box
                      className="close-button"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: 0,
                        visibility: 'hidden',
                        transition: 'opacity 0.2s ease, visibility 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: '#f5f5f5',
                        },
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log('Delete image:', image)
                      }}>
                      <CloseIcon style={{ width: 20, height: 20, color: '#666' }} />
                    </Box>
                  </Box>
                ))}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#fafafa',
                  }}>
                  <FileIcon style={{ width: 40, height: 48, color: '#e0e0e0' }} />
                  <Typography sx={{ fontSize: 12, color: '#888', mt: 1 }}>document_File_name.pdf</Typography>
                </Box>
              </Box>
              <Box sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar width={24} height={24} borderRadius="8px" src={mockMedicalRecords.doctorAvatar} />
                  <Typography variant="subtitle2">{mockMedicalRecords.doctorName}</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Typography variant="body1" color="rgba(21, 22, 24, 0.6)">
                      {mockMedicalRecords.date}
                    </Typography>
                    <Typography variant="body1" color="rgba(21, 22, 24, 0.6)">
                      {mockMedicalRecords.time}
                    </Typography>
                  </Box>
                </Box>
                <MedicalRecordSection sections={mockMedicalRecords.sections} />
              </Box>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <MentionTextField
                  placeholder="Напишіть свій коментар..."
                  multiline
                  rows={1}
                  value={comment1}
                  onChange={setComment1}
                  sx={{
                    width: '100%',
                    background: '#d9dce9',
                  }}
                />
                <AttachIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: 'rgba(21, 22, 24, 0.6)',
                    position: 'absolute',
                    right: 10,
                    bottom: '50%',
                    transform: 'translateY(50%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setUploadFileModalOpen(true)}
                />
              </Box>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: '0 2px 3px -1px rgba(0,0,0,0.1), 0 1px 12px 0 rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
          <Box
            sx={{ p: 2, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 16, display: 'inline' }}>Візит 2</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(21, 22, 24, 0.6)', ml: 1, display: 'inline' }}>
                  07.09.2024 17:30
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2">
                  Лікар: <span style={{ color: 'rgba(21, 22, 24, 0.6' }}>Олекса Олексій Ігорович</span>
                </Typography>
                <Typography variant="body2">
                  Асистент: <span style={{ color: 'rgba(21, 22, 24, 0.6' }}>Олекса Олексій Ігорович</span>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChevronIcon
                style={{
                  width: 24,
                  height: 24,
                  color: 'rgba(21, 22, 24, 0.6)',
                  transform: isVisitCollapsed('visit2') ? 'rotate(0deg)' : 'rotate(180deg)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onClick={() => handleChevronClick('visit2')}
              />
              <DeleteIcon
                style={{ width: 24, height: 24, color: 'rgba(21, 22, 24, 0.6)', cursor: 'pointer' }}
                onClick={handleDeleteDialogOpen}
              />
            </Box>
          </Box>
          {!isVisitCollapsed('visit2') && (
            <Box sx={{ background: '#f5f7fe', p: 2, pt: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between',
                }}>
                <Box sx={{ mb: isMobile ? 2 : 0 }}>
                  <Typography sx={{ color: '#7324d5', fontSize: 15, mb: 0.5, cursor: 'pointer' }}>
                    Виконані маніпуляції
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: '#222' }}>
                    Профілактична гігієна; Ремінералізуюча аплікація
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ color: '#0029d9', fontSize: 14, cursor: 'pointer' }}>
                      Акт виконаних робіт
                    </Typography>
                    <LinkIcon style={{ width: 16, height: 16, color: '#0029d9' }} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Checkbox size="small" sx={{ p: 0, mr: 1 }} />
                    <Typography sx={{ fontSize: 14, color: '#7324d5' }}>Етап не потребує фото</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Box
                  sx={{
                    border: '1.5px solid #ff2d2d',
                    borderRadius: 2,
                    p: 1,
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography sx={{ color: '#ff2d2d', fontSize: 15, textAlign: 'center' }}>
                    Фото виконаних робіт не підвантажені, заробітна плата утримується до моменту завантаження фото
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position: 'relative', mt: 2 }}>
                <MentionTextField
                  placeholder="Напишіть свій коментар..."
                  multiline
                  rows={1}
                  value={comment1}
                  onChange={setComment1}
                  sx={{
                    width: '100%',
                    background: '#d9dce9',
                  }}
                />
                <AttachIcon
                  style={{
                    width: 24,
                    height: 24,
                    color: 'rgba(21, 22, 24, 0.6)',
                    position: 'absolute',
                    right: 10,
                    bottom: '50%',
                    transform: 'translateY(50%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setUploadFileModalOpen(true)}
                />
              </Box>
            </Box>
          )}
        </Box>
        {selectedImage && <ImageModal open={modalOpen} onClose={handleCloseModal} imageSrc={selectedImage.src} />}
      </Box>
    </>
  )
}
