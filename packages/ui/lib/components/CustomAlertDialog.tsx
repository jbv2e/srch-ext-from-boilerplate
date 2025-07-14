import { useState, useRef, useEffect } from 'react'

type ButtonProps = {
  text: string
  onClick: () => void
  className?: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  buttons: ButtonProps[]
}

export const CustomAlertDialog = ({ open, onOpenChange, title, description, buttons }: Props) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onOpenChange])

  if (!open) {
    return null
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialogRef.current) {
      setIsDragging(true)
      dragStartPos.current = {
        x: e.clientX - dialogRef.current.offsetLeft,
        y: e.clientY - dialogRef.current.offsetTop,
      }
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-sm absolute"
        style={{ top: `${position.y}px`, left: `${position.x}px`, transform: 'translate(-50%, -50%)' }}>
        <div
          role="button"
          tabIndex={0}
          className="bg-gray-100 px-4 py-2 rounded-t-lg cursor-move"
          onMouseDown={handleMouseDown}>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="flex justify-end space-x-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  button.onClick()
                  onOpenChange(false)
                }}
                className={`px-4 py-2 rounded ${button.className || 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
