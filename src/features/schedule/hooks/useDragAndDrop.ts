import { useRef, useState, useCallback } from 'react'
import type { Event } from '../types/schedule-types'

interface DragState {
  isDragging: boolean
  draggedEvent: Event | null
  dragStartX: number
  dragStartY: number
  dragOffsetX: number
  dragOffsetY: number
  originalPosition: { top: number; left: number } | null
  currentPosition: { top: number; left: number } | null
  dropTarget: { dayIdx: number; cIdx: number; time: string } | null
}

export const useDragAndDrop = () => {
  const dragState = useRef<DragState>({
    isDragging: false,
    draggedEvent: null,
    dragStartX: 0,
    dragStartY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    originalPosition: null,
    currentPosition: null,
    dropTarget: null,
  })

  const [dropTarget, setDropTarget] = useState<{ dayIdx: number; cIdx: number; time: string } | null>(null)

  const handleDragStart = useCallback((e: React.DragEvent, event: Event) => {
    dragState.current.isDragging = true
    dragState.current.draggedEvent = event
    dragState.current.dragStartX = e.clientX
    dragState.current.dragStartY = e.clientY
    dragState.current.dragOffsetX = 0
    dragState.current.dragOffsetY = 0
    dragState.current.originalPosition = { top: e.clientY, left: e.clientX }
    dragState.current.currentPosition = { top: e.clientY, left: e.clientX }
    dragState.current.dropTarget = null

    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', event.id.toString())
  }, [])

  const handleDragOver = useCallback(
    (e: React.DragEvent, dayIdx: number, cIdx: number, time: string) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'

      const newDropTarget = { dayIdx, cIdx, time }
      if (JSON.stringify(dropTarget) !== JSON.stringify(newDropTarget)) {
        setDropTarget(newDropTarget)
        dragState.current.dropTarget = newDropTarget
      }
    },
    [dropTarget]
  )

  const handleDragEnd = useCallback(() => {
    dragState.current.isDragging = false
    dragState.current.draggedEvent = null
    dragState.current.dropTarget = null
    setDropTarget(null)
  }, [])

  const isDragging = dragState.current.isDragging
  const draggedEvent = dragState.current.draggedEvent

  return {
    isDragging,
    draggedEvent,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }
}
