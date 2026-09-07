import React, { useState } from 'react'
import { Box, Button, Switch, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import type { Act, Detail, Payment, Order, WriteOff } from '../../model'
import { initialActs, initialDetails, initialPayments, initialOrders, initialWriteOffs } from '../../model'
import { ActsList, PaymentsList, BalanceList, OrdersList, WriteOffsList, ActEditor, ActDetailsView } from '../'
import { PaymentModal } from './payment-modal'
import { RefundModal } from './refund-modal'
import { PaginationFooter } from '../../../settings-workers/ui'

interface PatientFinancesWidgetProps {
  acts?: Act[]
  details?: Detail[]
  payments?: Payment[]
  orders?: Order[]
  writeOffs?: WriteOff[]
}

export const PatientFinancesWidget: React.FC<PatientFinancesWidgetProps> = ({
  acts = initialActs,
  details = initialDetails,
  payments = initialPayments,
  orders = initialOrders,
  writeOffs = initialWriteOffs,
}) => {
  const [selectedDetails, setSelectedDetails] = useState<number[]>([1])
  const [toggle, setToggle] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [expandedActs, setExpandedActs] = useState<number[]>([4])
  const [expandedOrders, setExpandedOrders] = useState<number[]>([4])
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const [showActEditor, setShowActEditor] = useState(false)
  const [selectedAct, setSelectedAct] = useState<Act | null>(null)
  const [showActDetails, setShowActDetails] = useState(false)
  const [selectedActNumber, setSelectedActNumber] = useState<string>('')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedDetails(details?.map((d) => d.id))
    } else {
      setSelectedDetails([])
    }
  }

  const handleSelectDetail = (id: number) => {
    setSelectedDetails((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  const toggleAct = (actId: number) => {
    setExpandedActs((prev) => (prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]))
  }

  const toggleOrder = (orderId: number) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const handleActClick = (act: Act) => {
    setSelectedAct(act)
    setShowActEditor(true)
  }

  const handleCloseActEditor = () => {
    setShowActEditor(false)
    setSelectedAct(null)
  }

  const handleSaveAct = () => {
    console.log('Saving act:', selectedAct)
    setShowActEditor(false)
    setSelectedAct(null)
  }

  const handleActNumberClick = (actNumber: string) => {
    setSelectedActNumber(actNumber)
    setShowActDetails(true)
  }

  const renderTabContent = () => {
    if (tabValue === 0) {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              p: 2,
              overflowX: 'auto',
              minWidth: 'max-content',
            }}>
            <Button variant="contained">{isMobile ? '+' : 'СТВОРИТИ АКТ'}</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Switch checked={toggle} onChange={() => setToggle((v) => !v)} />
              <Button
                variant="outlined"
                sx={{ color: '#2e7d32', borderColor: '#2e7d32', textTransform: 'none' }}
                onClick={() => setIsPaymentModalOpen(true)}>
                {isMobile ? 'ПРИЙНЯТИ' : 'ПРИЙНЯТИ ОПЛАТУ'}
              </Button>
              <Button
                variant="outlined"
                sx={{ color: '#d32f2f', borderColor: '#d32f2f', textTransform: 'none' }}
                onClick={() => setIsRefundModalOpen(true)}>
                {isMobile ? 'ПОВЕРНУТИ' : 'ПОВЕРНУТИ КОШТИ'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 3fr 1fr ', gap: 2, px: 2, minWidth: 'max-content' }}>
              <ActsList
                acts={acts}
                details={details}
                expandedActs={expandedActs}
                selectedDetails={selectedDetails}
                onToggleAct={toggleAct}
                onActClick={handleActClick}
                onSelectDetail={handleSelectDetail}
                onSelectAllDetails={handleSelectAll}
                toggle={toggle}
              />
              <PaymentsList payments={payments} />
              <BalanceList payments={payments} />
            </Box>
          </Box>
        </>
      )
    } else {
      return (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              p: 2,
              pb: 0,
              overflowX: 'auto',
              minWidth: 'max-content',
            }}>
            <Button variant="contained">ЗАМОВИТИ</Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: '#2e7d32',
                  borderColor: '#2e7d32',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#1b5e20',
                    bgcolor: 'rgba(46, 125, 50, 0.04)',
                  },
                }}>
                СПИСАТИ ЗІ СКЛАДУ
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: '#f57c00',
                  borderColor: '#f57c00',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: '#e65100',
                    bgcolor: 'rgba(245, 124, 0, 0.04)',
                  },
                }}>
                ВНЕСТИ ВИТРАТУ
              </Button>
            </Box>
          </Box>
          <Box sx={{ overflowX: 'auto', maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, p: 2, minWidth: 'max-content' }}>
              <OrdersList
                orders={orders}
                expandedOrders={expandedOrders}
                onToggleOrder={toggleOrder}
                onActNumberClick={handleActNumberClick}
              />
              <WriteOffsList writeOffs={writeOffs} />
            </Box>
          </Box>
        </>
      )
    }
  }

  return (
    <Box sx={{ p: 2, width: '100%', overflow: 'hidden' }}>
      {showActEditor && selectedAct ? (
        <ActEditor act={selectedAct} details={details} onClose={handleCloseActEditor} onSave={handleSaveAct} />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ minHeight: 40 }}>
              <Tab label="Акти" sx={{ textTransform: 'none', minHeight: 40 }} />
              <Tab label="Замовлення і Списання" sx={{ textTransform: 'none', minHeight: 40 }} />
            </Tabs>
          </Box>
          <Box
            sx={{
              boxShadow:
                '0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 12px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
              background: '#fff',
              borderRadius: 2,
              width: '100%',
            }}>
            {showActDetails && selectedActNumber ? (
              <ActDetailsView actNumber={selectedActNumber} />
            ) : (
              renderTabContent()
            )}
            {tabValue === 0 && !showActDetails && (
              <PaginationFooter
                count={10}
                page={1}
                onPageChange={() => {}}
                rowsPerPage={10}
                onRowsPerPageChange={() => {}}
                totalRows={100}
              />
            )}
          </Box>
          <PaymentModal open={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
          <RefundModal open={isRefundModalOpen} onClose={() => setIsRefundModalOpen(false)} />
        </>
      )}
    </Box>
  )
}
