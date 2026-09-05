import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { token } from '../../utils/storageUtils'

interface PrivatePageWrapperProps {
  children: ReactNode
}
const PrivatePageWrapper: React.FC<PrivatePageWrapperProps> = ({ children }) => {
  const location = useLocation()
  if (!token) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }
  return <>{children}</>
}

export default PrivatePageWrapper
