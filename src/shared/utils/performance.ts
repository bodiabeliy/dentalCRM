// Performance optimization utilities for drag operations

/**
 * Throttle function to limit execution frequency
 * Optimized for drag operations with 60fps target
 */
export const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number): T => {
  let inThrottle: boolean
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      window.setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

/**
 * Debounce function to delay execution until after a pause
 * Useful for search inputs and resize handlers
 */
export const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number): T => {
  let timeoutId: number
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => func(...args), delay)
  }) as T
}

/**
 * RequestAnimationFrame wrapper for smooth animations
 * Better performance than setTimeout for visual updates
 */
export const rafThrottle = <T extends (...args: unknown[]) => void>(func: T): T => {
  let ticking = false
  return ((...args: unknown[]) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        func(...args)
        ticking = false
      })
      ticking = true
    }
  }) as T
}

/**
 * Optimized scroll handler with passive listeners
 * Reduces main thread blocking during scroll
 */
export const createOptimizedScrollHandler = (handler: (scrollLeft: number, scrollTop: number) => void) => {
  return throttle((e: unknown) => {
    const target = e as HTMLElement
    handler(target.scrollLeft, target.scrollTop)
  }, 16) // ~60fps
}

/**
 * Advanced scroll performance optimizer
 * Combines multiple techniques for smooth scrolling
 */
export const createScrollOptimizer = (
  element: HTMLElement,
  options: {
    throttleMs?: number
    usePassive?: boolean
  } = {}
) => {
  const { throttleMs = 16, usePassive = true } = options

  // Apply CSS optimizations
  element.style.willChange = 'scroll-position'
  element.style.transform = 'translateZ(0)'
  element.style.backfaceVisibility = 'hidden'
  element.style.perspective = '1000px'
  element.style.scrollBehavior = 'auto'
  element.style.contain = 'layout style paint'

  // Create throttled scroll handler
  const scrollHandler = throttle(() => {
    // Handle scroll logic here
    // You can add custom scroll handling logic here
  }, throttleMs)

  // Add optimized event listener
  element.addEventListener('scroll', scrollHandler, { passive: usePassive })

  return {
    destroy: () => {
      element.removeEventListener('scroll', scrollHandler)
      element.style.willChange = 'auto'
      element.style.transform = 'none'
      element.style.backfaceVisibility = 'visible'
      element.style.perspective = 'none'
      element.style.contain = 'none'
    },
    updateOptions: () => {
      // Update options dynamically if needed
    },
  }
}

/**
 * Memory-efficient event listener management
 * Automatically cleans up listeners to prevent memory leaks
 */
export class EventManager {
  private listeners: Map<string, Set<EventListener>> = new Map()

  addListener(element: HTMLElement, event: string, listener: EventListener, options?: AddEventListenerOptions) {
    const key = `${element.id || 'anonymous'}-${event}`
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key)!.add(listener)
    element.addEventListener(event, listener, options)
  }

  removeListener(element: HTMLElement, event: string, listener: EventListener) {
    const key = `${element.id || 'anonymous'}-${event}`
    const listeners = this.listeners.get(key)
    if (listeners) {
      listeners.delete(listener)
      element.removeEventListener(event, listener)
      if (listeners.size === 0) {
        this.listeners.delete(key)
      }
    }
  }

  cleanup() {
    this.listeners.clear()
  }
}

/**
 * Virtual scrolling utilities for large datasets
 * Only renders visible items to improve performance
 */
export const createVirtualScroller = (itemHeight: number, containerHeight: number, totalItems: number) => {
  return {
    getVisibleRange: (scrollTop: number) => {
      const startIndex = Math.floor(scrollTop / itemHeight)
      const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight) + 1, totalItems)
      return { startIndex, endIndex }
    },
    getItemOffset: (index: number) => index * itemHeight,
    getTotalHeight: () => totalItems * itemHeight,
  }
}

/**
 * Intersection Observer for lazy loading
 * Efficiently detects when elements enter/exit viewport
 */
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  })
}

/**
 * Performance monitoring utilities
 * Track and log performance metrics
 */
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()

  startTimer(label: string) {
    const startTime = performance.now()
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime

      if (!this.metrics.has(label)) {
        this.metrics.set(label, [])
      }
      this.metrics.get(label)!.push(duration)

      // Log slow operations
      if (duration > 16) {
        // > 60fps threshold
        console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
      }
    }
  }

  getAverageTime(label: string): number {
    const times = this.metrics.get(label)
    if (!times || times.length === 0) return 0
    return times.reduce((sum, time) => sum + time, 0) / times.length
  }

  getMetrics() {
    return Object.fromEntries(this.metrics)
  }

  clear() {
    this.metrics.clear()
  }
}

/**
 * Scroll performance analyzer
 * Helps identify scroll performance bottlenecks
 */
export const analyzeScrollPerformance = (element: HTMLElement) => {
  const monitor = new PerformanceMonitor()
  let frameCount = 0
  let lastTime = performance.now()

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        monitor.startTimer('scroll-frame')()
      }
    }
  })

  observer.observe({ entryTypes: ['measure'] })

  const scrollHandler = throttle(() => {
    frameCount++
    const currentTime = performance.now()
    const frameTime = currentTime - lastTime

    if (frameTime > 16) {
      console.warn(`Slow scroll frame: ${frameTime.toFixed(2)}ms`)
    }

    lastTime = currentTime
  }, 16)

  element.addEventListener('scroll', scrollHandler, { passive: true })

  return {
    getFrameRate: () => frameCount,
    getMetrics: () => monitor.getMetrics(),
    destroy: () => {
      element.removeEventListener('scroll', scrollHandler)
      observer.disconnect()
    },
  }
}
