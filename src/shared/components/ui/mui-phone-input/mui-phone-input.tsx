import { MenuItem, Select } from '@mui/material'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'

type CountryOption = string | { value: string; label: string }

type MuiPhoneInputProps = {
  value: string
  onChange: (value: string | undefined) => void
  options: string[]
  labels?: Record<string, string>
} & React.ComponentProps<typeof Select>

const MuiPhoneInput = (props: MuiPhoneInputProps) => {
  const { value, onChange, options, labels = {}, ...rest } = props

  const countryOptions = Array.isArray(options) && options.length > 0 ? options : getCountries()
  return (
    <Select
      value={value || ''}
      onChange={(e) => {
        const val = e.target.value
        onChange(typeof val === 'string' ? val : undefined)
      }}
      displayEmpty
      variant="standard"
      sx={{
        minWidth: 80,
        mr: 1,
        ml: 2,
        background: '#fff',
        borderRadius: 2,
        boxShadow: 'none',
        '.MuiSelect-standard': { border: 'none' },
        '&:before, &:after': { display: 'none' },
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
      }}
      renderValue={(selected) => {
        let code: string | undefined
        if (typeof selected === 'string') {
          code = selected
        }
        if (!code) return null
        return (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
              alt={code}
              width={24}
              height={18}
              style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }}
            />
            {/* @ts-expect-error: Library expects CountryCode, but only string is available */}+
            {getCountryCallingCode(code as string)}
          </span>
        )
      }}
      {...rest}>
      {countryOptions?.map((option: CountryOption) => {
        if (typeof option === 'string') {
          const label = (labels && labels[option]) || option
          return (
            <MenuItem value={option} key={option} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span className={`PhoneInputCountryIcon PhoneInputCountryIcon--${option}`} style={{ marginRight: 8 }}>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option}.svg`}
                  alt={option}
                  width={24}
                  height={18}
                  style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
                />
              </span>
              {/* @ts-expect-error: Library expects CountryCode, but only string is available */}
              {label} +{getCountryCallingCode(option as string)}
            </MenuItem>
          )
        } else if (option && typeof option === 'object' && 'value' in option && 'label' in option) {
          const code = option.value as string
          const label = option.label as string
          return (
            <MenuItem value={code} key={code} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span className={`PhoneInputCountryIcon PhoneInputCountryIcon--${code}`} style={{ marginRight: 8 }}>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
                  alt={code}
                  width={24}
                  height={18}
                  style={{ objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }}
                />
              </span>
              {/* @ts-expect-error: Library expects CountryCode, but only string is available */}
              {label} +{getCountryCallingCode(code as string)}
            </MenuItem>
          )
        }
        return null
      })}
    </Select>
  )
}

export default MuiPhoneInput
