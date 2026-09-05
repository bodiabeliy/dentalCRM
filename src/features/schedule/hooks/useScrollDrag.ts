import React, { useCallback, useRef, useEffect } from 'react'
import { rafThrottle } from '../../../shared/utils/performance'

interface ScrollDragState {
  isTouchDragging: boolean
  touchStartX: number
  touchStartY: number
  scrollElement: HTMLElement | null
  lastScrollLeft: number
  lastScrollTop: number
}

export const useScrollDrag = (gridRef: React.RefObject<HTMLDivElement | null>, isDragging: boolean) => {
  const scrollDragState = useRef<ScrollDragState>({
    isTouchDragging: false,
    touchStartX: 0,
    touchStartY: 0,
    scrollElement: null,
    lastScrollLeft: 0,
    lastScrollTop: 0,
  })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return

      const target = e.target as HTMLElement
      const isEventCard = target.closest('[draggable="true"]')

      if (isEventCard) return

      const element = gridRef.current
      if (!element) return

      scrollDragState.current.isTouchDragging = true
      scrollDragState.current.touchStartX = e.clientX
      scrollDragState.current.touchStartY = e.clientY
      scrollDragState.current.lastScrollLeft = element.scrollLeft
      scrollDragState.current.lastScrollTop = element.scrollTop
      scrollDragState.current.scrollElement = element

      e.preventDefault()
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'grabbing'
      element.style.cursor = 'grabbing'
    },
    [gridRef]
  )

  const handleMouseMove = useCallback(
    rafThrottle((e: unknown) => {
      const mouseEvent = e as React.MouseEvent
      if (!scrollDragState.current.isTouchDragging || !scrollDragState.current.scrollElement || isDragging) return

      const deltaX = mouseEvent.clientX - scrollDragState.current.touchStartX
      const deltaY = mouseEvent.clientY - scrollDragState.current.touchStartY
      const newScrollLeft = scrollDragState.current.lastScrollLeft - deltaX
      const newScrollTop = scrollDragState.current.lastScrollTop - deltaY

      scrollDragState.current.scrollElement.scrollLeft = newScrollLeft
      scrollDragState.current.scrollElement.scrollTop = newScrollTop
    }),
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    scrollDragState.current.isTouchDragging = false
    scrollDragState.current.scrollElement = null
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    if (gridRef.current) {
      gridRef.current.style.cursor = 'grab'
    }
  }, [gridRef])

  const resetStyles = useCallback(() => {
    document.body.style.userSelect = ''
    document.body.style.cursor = ''
    if (gridRef.current) {
      gridRef.current.style.cursor = 'grab'
    }
  }, [gridRef])

  useEffect(() => {
    return () => {
      resetStyles()
    }
  }, [resetStyles])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0]
      const target = e.target as HTMLElement
      const isEventCard = target.closest('[draggable="true"]')

      if (isEventCard) return

      const element = gridRef.current
      if (!element) return

      scrollDragState.current.touchStartX = touch.clientX
      scrollDragState.current.touchStartY = touch.clientY
      scrollDragState.current.lastScrollLeft = element.scrollLeft
      scrollDragState.current.lastScrollTop = element.scrollTop
      scrollDragState.current.scrollElement = element
      scrollDragState.current.isTouchDragging = true
    },
    [gridRef]
  )

  const handleTouchMove = useCallback(
    rafThrottle((e: unknown) => {
      const touchEvent = e as React.TouchEvent
      if (!scrollDragState.current.isTouchDragging || !scrollDragState.current.scrollElement || isDragging) return

      const touch = touchEvent.touches[0]
      const deltaX = touch.clientX - scrollDragState.current.touchStartX
      const deltaY = touch.clientY - scrollDragState.current.touchStartY
      const newScrollLeft = scrollDragState.current.lastScrollLeft - deltaX
      const newScrollTop = scrollDragState.current.lastScrollTop - deltaY

      scrollDragState.current.scrollElement.scrollLeft = newScrollLeft
      scrollDragState.current.scrollElement.scrollTop = newScrollTop
    }),
    [isDragging]
  )

  const handleTouchEnd = useCallback(() => {
    scrollDragState.current.isTouchDragging = false
    scrollDragState.current.scrollElement = null
  }, [])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
