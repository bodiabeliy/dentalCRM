import { Box, Button } from '@mui/material'
import { mockNomenclature } from '../../model/mock-data'
import { PriceActionsMenu } from '../price-actions-menu/price-actions-menu'

import AddIcon from '@mui/icons-material/Add'
import { useNomenclatureSettings } from '../../model'
import { NomenclatureDetailsDialog } from '../nomenclature-details-dialog/nomenclature-details-dialog'
import { NomenclatureToolbar } from '../nomenclature-toolbar/nomenclature-toolbar'
import { NomenclatureAccordion } from '../nomenclature-accordion/nomenclature-accordion'
import { NomenclaturePositionsTable } from '../nomenclature-positions-table'
import { StockManagementDialog } from '../stock-management-dialog/stock-management-dialog'
import { AmortizationDialog } from '../amortization-dialog/amortization-dialog'
import { PriceDynamicsDialog } from '../price-dynamics-dialog/price-dynamics-dialog'

export function NomenclatureContent() {
  const {
    anchorEl,
    expanded,
    searchQuery,
    openNomenclatureDetailsDialog,
    openStockManagementDialog,
    openAmortizationDialog,
    openPriceDynamicsDialog,
    nomenclatureActions,

    setSearchQuery,
    handleAccordionChange,
    handleMenuOpen,
    handleMenuClose,
    setOpenNomenclatureDetailsDialog,
    setOpenStockManagementDialog,
    setOpenAmortizationDialog,
    setOpenPriceDynamicsDialog,
    setOpenGeneralPriceDetailsDialog,
  } = useNomenclatureSettings()

  const handleAddSection = () => {
    // TODO: Implement add section logic
    console.log('Add section clicked')
  }

  return (
    <>
      <NomenclatureToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onEditGeneralDetails={() => setOpenGeneralPriceDetailsDialog(true)}
        onAddSection={handleAddSection}
      />
      <Box sx={{ mt: 3 }}>
        {mockNomenclature.map((nomenclature) => (
          <NomenclatureAccordion
            key={nomenclature.id}
            section={nomenclature}
            expanded={expanded.includes(nomenclature.id)}
            onToggle={handleAccordionChange}>
            <NomenclaturePositionsTable positions={nomenclature.positions} onMenuOpen={handleMenuOpen} />
            <Box sx={{ px: 2, py: 1 }}>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                sx={{ textTransform: 'none', fontWeight: 500, my: 2 }}
                size="medium">
                ДОДАТИ ПОЗИЦІЮ ПРАЙСУ
              </Button>
            </Box>
          </NomenclatureAccordion>
        ))}
      </Box>
      <PriceActionsMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        actions={nomenclatureActions}
      />
      <NomenclatureDetailsDialog
        open={openNomenclatureDetailsDialog}
        onClose={() => setOpenNomenclatureDetailsDialog(false)}
        onSave={() => {}}
      />
      <StockManagementDialog
        open={openStockManagementDialog}
        onClose={() => setOpenStockManagementDialog(false)}
        onSave={() => {}}
      />
      <AmortizationDialog
        open={openAmortizationDialog}
        onClose={() => setOpenAmortizationDialog(false)}
        onSave={() => {}}
      />
      <PriceDynamicsDialog open={openPriceDynamicsDialog} onClose={() => setOpenPriceDynamicsDialog(false)} />
    </>
  )
}
