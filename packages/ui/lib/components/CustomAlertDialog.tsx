import { useState, useRef, useEffect, useCallback } from 'react'

type ButtonProps = {
  text: string
  onClick: () => void
  className?: string
}

type Props = {
  open: boolean
  onOpenChange?: (open: boolean) => void // onOpenChange를 선택적(optional) prop으로 변경
  title: string
  description: string
  buttons: ButtonProps[]
}

export const CustomAlertDialog = ({ open: controlledOpen, onOpenChange, title, description, buttons }: Props) => {
  // onOpenChange 유무에 따라 제어/비제어 모드 결정
  const isControlled = onOpenChange !== undefined

  // 비제어 모드를 위한 내부 상태
  const [internalOpen, setInternalOpen] = useState(controlledOpen)

  // 최종적으로 사용할 open 상태. 제어 모드일 경우 prop을, 비제어 모드일 경우 내부 state를 사용
  const open = isControlled ? controlledOpen : internalOpen

  // 제어 모드일 때, 부모의 open prop이 변경되면 내부 상태도 동기화
  useEffect(() => {
    setInternalOpen(controlledOpen)
  }, [controlledOpen])

  // 상태를 변경하는 통합 핸들러
  // useCallback으로 함수를 메모이제이션합니다.
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        // 제어 모드이면 부모의 함수 호출
        onOpenChange(newOpen)
      } else {
        // 비제어 모드이면 내부 상태 변경
        setInternalOpen(newOpen)
      }
    },
    [isControlled, onOpenChange],
  )

  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleOpenChange(false) // 통합 핸들러 사용
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleOpenChange])

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
                  handleOpenChange(false) // 통합 핸들러를 사용하고, false로 수정하여 팝업을 닫음
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
