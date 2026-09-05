import { useState, useMemo } from 'react'
import type { PriceAction } from '../../../../app/providers/types/pricing'
import SettingsIcon from '../../../../shared/assets/icons/settings_general.svg?react'
import DocumentIcon from '../../../../shared/assets/icons/document.svg?react'

import FileIcon from '../../../../shared/assets/icons/file.svg?react'
import AmortisationIcon from '../../../../shared/assets/icons/amortisation.svg?react'
import DynamicsIcon from '../../../../shared/assets/icons/dynamics.svg?react'
import DeleteIcon from '@mui/icons-material/Delete'

export function useNomenclatureSettings() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expanded, setExpanded] = useState<Array<string>>([])
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [openNomenclatureDetailsDialog, setOpenNomenclatureDetailsDialog] = useState(false)
  const [nomenclatureDetails, setNomenclatureDetails] = useState<string[]>(['Назва', 'Назва', 'Назва', 'Назва'])
  const [openGeneralPriceDetailsDialog, setOpenGeneralPriceDetailsDialog] = useState(false)
  const [openWorkExampleDialog, setOpenWorkExampleDialog] = useState(false)
  const [openLinkToProductsDialog, setOpenLinkToProductsDialog] = useState(false)
  const [openStockManagementDialog, setOpenStockManagementDialog] = useState(false)
  const [openAmortizationDialog, setOpenAmortizationDialog] = useState(false)
  const [openPriceDynamicsDialog, setOpenPriceDynamicsDialog] = useState(false)

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((item) => item !== panel))
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const nomenclatureActions: PriceAction[] = useMemo(
    () => [
      { label: 'Деталі', Icon: SettingsIcon, onClick: () => setOpenNomenclatureDetailsDialog(true) },
      { label: 'Управління запасами', Icon: FileIcon, onClick: () => setOpenStockManagementDialog(true) },
      { label: "Зв'язані закази", Icon: DocumentIcon, onClick: () => {} },
      { label: 'Динаміка зміни ціни', Icon: DynamicsIcon, onClick: () => setOpenPriceDynamicsDialog(true) },
      { label: 'Амортизація', Icon: AmortisationIcon, onClick: () => setOpenAmortizationDialog(true) },
      { label: 'Видалити', Icon: DeleteIcon },
    ],
    [
      setOpenNomenclatureDetailsDialog,
      setOpenStockManagementDialog,
      setOpenAmortizationDialog,
      setOpenPriceDynamicsDialog,
    ]
  )

  return {
    anchorEl,
    expanded,
    activeTab,
    searchQuery,
    openNomenclatureDetailsDialog,
    nomenclatureDetails,
    openGeneralPriceDetailsDialog,
    openWorkExampleDialog,
    openLinkToProductsDialog,
    openStockManagementDialog,
    openAmortizationDialog,
    openPriceDynamicsDialog,
    nomenclatureActions,

    setActiveTab,
    setSearchQuery,
    setNomenclatureDetails,
    handleAccordionChange,
    handleMenuOpen,
    handleMenuClose,
    setOpenNomenclatureDetailsDialog,
    setOpenGeneralPriceDetailsDialog,
    setOpenWorkExampleDialog,
    setOpenLinkToProductsDialog,
    setOpenStockManagementDialog,
    setOpenAmortizationDialog,
    setOpenPriceDynamicsDialog,
  }
}
