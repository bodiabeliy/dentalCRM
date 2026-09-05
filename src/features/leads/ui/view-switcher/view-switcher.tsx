import { useState } from 'react'

import { Box, FormControl, FormControlLabel, Radio, RadioGroup, useMediaQuery, useTheme } from '@mui/material'
import ChartViewIcon from '../../../../shared/assets/icons/chart-view.svg?react'
import ListViewIcon from '../../../../shared/assets/icons/list-view.svg?react'
import ArchiveIcon from '../../../../shared/assets/icons/archive.svg?react'
import { LeadSelector } from '../../../../shared/components/ui/dropdown/leads-selector'
import { LEADS_OPTIONS } from '../../model/constants'
import type { LeadFilter } from '../../model/types'

const ViewSwitcher = ({ isShowKanban, onClick }: { isShowKanban: boolean; onClick: () => void }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [selectedOption, setSelectedOption] = useState<LeadFilter>(LEADS_OPTIONS[0])
  const [filterStatus, setFilterStatus] = useState<'all' | 'active'>('all')

  const handleFilterSelect = (filterOption: LeadFilter) => {
    setSelectedOption(filterOption)
  }

  const handleViewToggle = () => {
    onClick()
  }

  return (
    <>
      <Box
        onClick={handleViewToggle}
        sx={{
          border: '1px solid #0029D980',
          borderRadius: '8px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            cursor: 'pointer',
          },
        }}>
        {!isShowKanban ? <ChartViewIcon /> : <ListViewIcon />}
      </Box>
      <Box
        sx={{
          border: '1px solid #0029D980',
          borderRadius: '8px',
          maxWidth: '160px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ArchiveIcon style={{ color: '#0029D9' }} />
      </Box>

      {isMobile || !isShowKanban ? null : (
        <>
          <LeadSelector
            options={LEADS_OPTIONS}
            selectedFilterOption={selectedOption}
            onFilterSelect={handleFilterSelect}
            bgcolor="#0029D9"
          />

          <FormControl component="fieldset">
            <RadioGroup
              row
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active')}
              sx={{
                flexDirection: isMobile ? 'column' : 'row',
              }}>
              <FormControlLabel
                value="all"
                control={
                  <Radio
                    sx={{
                      color: '#bbb',
                      '&.Mui-checked': {
                        color: '#0029d9',
                      },
                    }}
                  />
                }
                label="Всі"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#444',
                  },
                }}
              />
              <FormControlLabel
                value="active"
                control={
                  <Radio
                    sx={{
                      color: '#bbb',
                      '&.Mui-checked': {
                        color: '#0029d9',
                      },
                    }}
                  />
                }
                label="Активні"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: '#444',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </>
  )
}

export default ViewSwitcher
