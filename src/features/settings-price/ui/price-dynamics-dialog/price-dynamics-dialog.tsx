import { Dialog, DialogContent, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DynamicsIcon from '../../../../shared/assets/icons/dynamics.svg?react'
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine,
  AreaChart,
  type DotProps,
} from 'recharts'

import { useState } from 'react'

const data = [
  { date: '03.12', value: 7 },
  { date: '05.12', value: 12 },
  { date: '07.12', value: 20 },
  { date: '09.12', value: 33 },
  { date: '11.12', value: 37 },
  { date: '15.12', value: 52 },
  { date: '17.12', value: 60 },
]

const selectedIndex = 3

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BlueTooltip(props: any) {
  const { active, payload } = props
  const isVisible = active && payload && payload.length

  return isVisible ? (
    <Box
      sx={{
        background: '#616161',
        color: '#fff',
        borderRadius: 3,
        px: 3,
        py: 1,
        fontSize: 14,
        fontWeight: 500,
        display: 'inline-block',
        minWidth: 80,
        textAlign: 'center',
        boxShadow: 'none',
        pointerEvents: 'none',
        visibility: isVisible ? 'visible' : 'hidden',
      }}>
      <span>Ціна {payload && payload[0] && payload[0].value}</span>
    </Box>
  ) : null
}

function CustomDot(
  props: DotProps & { hovered: boolean; onMouseEnter: () => void; onMouseLeave: () => void; index: number }
) {
  const { cx, cy, hovered, onMouseEnter, onMouseLeave } = props
  return (
    <circle
      cx={cx}
      cy={cy}
      r={9}
      stroke="#1976d2"
      strokeWidth={3}
      fill={hovered ? '#1976d2' : '#fff'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: 'pointer' }}
    />
  )
}

export function PriceDynamicsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        },
      }}
      BackdropProps={{
        sx: {
          background: 'rgba(44, 47, 57, 0.85)',
        },
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2, justifyContent: 'space-between', background: '#f4f7fe' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DynamicsIcon style={{ color: '#0029d9', marginRight: 8 }} />
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            Динаміка зміни ціни
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#000', fillOpacity: 0.54 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent
        sx={{ pb: 0, pt: 2, height: 400, background: '#fff', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}>
            <XAxis dataKey="date" tick={{ fontSize: 16, fill: '#222' }} axisLine={{ stroke: '#151618' }} tickLine />
            <YAxis
              tick={{ fontSize: 16, fill: '#222' }}
              axisLine={{ stroke: '#151618' }}
              tickLine
              width={40}
              domain={[0, 60]}
            />
            <ReferenceLine
              x={data[selectedIndex].date}
              stroke="#151618"
              strokeDasharray="14"
              ifOverflow="extendDomain"
            />
            <defs>
              <linearGradient id="priceDynamicsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4c8fff" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#1976d2" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1976d2"
              strokeWidth={0}
              fill="url(#priceDynamicsGradient)"
              fillOpacity={1}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1976d2"
              strokeWidth={3}
              dot={(props: DotProps & { index: number }) => (
                <CustomDot
                  {...props}
                  hovered={hoveredIndex === props.index}
                  onMouseEnter={() => setHoveredIndex(props.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )}
              activeDot={false}
              isAnimationActive={false}
            />
            <Tooltip content={<BlueTooltip />} cursor={false} wrapperStyle={{ pointerEvents: 'none' }} />
          </AreaChart>
        </ResponsiveContainer>
      </DialogContent>
    </Dialog>
  )
}
