import React, { useState } from 'react'
import { Box } from '@mui/material'
import avatarPlaceholder from '../../../assets/images/avatar-placeholder.png'

interface AvatarProps {
  src?: string
  alt?: string
  width?: number | string | object
  height?: number | string | object
  borderRadius?: string
  sx?: any
  onClick?: () => void
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  width = 40,
  height = 40,
  borderRadius = '8px',
  sx,
  onClick,
  style,
  children,
  ...props
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(src || avatarPlaceholder)

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true)
      setImageSrc(avatarPlaceholder)
    }
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  React.useEffect(() => {
    if (src) {
      setImageSrc(src)
      setImageError(false)
    } else {
      setImageSrc(avatarPlaceholder)
      setImageError(false)
    }
  }, [src])

  if (children && imageError) {
    return (
      <Box
        onClick={onClick}
        sx={{
          width,
          height,
          borderRadius,
          cursor: onClick ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#e0e0e0',
          ...sx,
        }}
        style={style}
        {...props}>
        {children}
      </Box>
    )
  }

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      onError={handleImageError}
      onLoad={handleImageLoad}
      onClick={onClick}
      sx={{
        width,
        height,
        borderRadius,
        cursor: onClick ? 'pointer' : 'default',
        ...sx,
      }}
      style={style}
      {...props}
    />
  )
}
