import { useState } from 'react'
import type React from 'react'
import { SlidePanel, CustomAlertDialog } from '@extension/ui'

type Props = {
  children?: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

type CustomAlertDialogProps = {
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  buttons: ButtonProps[]
}

type ButtonProps = {
  text: string
  onClick: () => void
  className?: string
}

export const SlideMainPage = ({ isOpen, onClose, children }: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertDescription, setAlertDescription] = useState('')
  const [alertButtons, setAlertButtons] = useState<ButtonProps[]>([])

  const handleOpenDialog = ({ title, description, buttons }: CustomAlertDialogProps) => {
    setIsAlertOpen(true)

    setAlertTitle(title)
    setAlertDescription(description)
    setAlertButtons(buttons)
  }

  // const alertButtons = [
  //   {
  //     text: 'Cancel',
  //     onClick: () => console.log('Cancel clicked'),
  //   },
  //   {
  //     text: 'Confirm',
  //     onClick: () => console.log('Confirm clicked'),
  //     className: 'bg-blue-500 text-white hover:bg-blue-600',
  //   },
  //   {
  //     text: 'Delete',
  //     onClick: () => console.log('Delete clicked'),
  //     className: 'bg-red-500 text-white hover:bg-red-600',
  //   },
  // ]

  if (!isOpen) {
    return null
  }

  return (
    <>
      <SlidePanel isOpen={isOpen} onClose={onClose}>
        {
          // isAlertOpen={isAlertOpen}
          // onAlertOpenChange={setIsAlertOpen}
          // alertTitle="Custom Alert"
          // alertDescription="This is a custom alert dialog with multiple buttons."
          // alertButtons={alertButtons}>
        }
        {children}
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-gray-800">조회 - 2</h2>
          <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex-grow overflow-y-auto text-gray-700">
          <p className="mb-4">여기에 확장 프로그램 콘텐츠를 표시합니다. 웹페이지와 CSS가 충돌하지 않습니다.</p>

          {/* 샘플 카드 */}
          <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">샘플 카드</h3>
            <p>Tailwind CSS로 스타일링된 컴포넌트입니다.</p>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex space-x-2">
            <button
              onClick={() =>
                handleOpenDialog({
                  title: 'Custom Alert',
                  description: 'This is a custom alert dialog with multiple buttons.',
                  buttons: [{ text: 'test', onClick: () => console.log('test') }],
                })
              }
              className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
              Open Dialog
            </button>
            <button className="px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-600">
              버튼 21
            </button>
          </div>
        </div>
        {isAlertOpen && (
          <CustomAlertDialog
            open={isAlertOpen}
            title={alertTitle}
            description={alertDescription}
            buttons={alertButtons}
            onOpenChange={setIsAlertOpen}
          />
        )}
      </SlidePanel>
    </>
  )
}
