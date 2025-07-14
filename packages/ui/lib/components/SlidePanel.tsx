import type React from 'react'
import { CustomAlertDialog } from './CustomAlertDialog'

type ButtonProps = {
  text: string
  onClick: () => void
  className?: string
}

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  isAlertOpen: boolean
  onAlertOpenChange: (open: boolean) => void
  alertTitle: string
  alertDescription: string
  alertButtons: ButtonProps[]
}

export const SlidePanel = ({
  isOpen,
  onClose,
  children,
  isAlertOpen,
  onAlertOpenChange,
  alertTitle,
  alertDescription,
  alertButtons,
}: Props) => {
  // const [isDarkMode, setIsDarkMode] = React.useState(localStorage.getItem('theme') === 'dark')

  // useEffect(() => {
  //   // console.log(document.documentElement.classList)
  //   console.log(localStorage.getItem('theme'))
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark')
  //     localStorage.setItem('theme', 'dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //     localStorage.setItem('theme', 'light')
  //   }
  // }, [isDarkMode])

  // if (localStorage.getItem('theme') === 'dark') {
  //   document.documentElement.classList.add('dark');
  // }

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div id="slide-panel" className="fixed inset-0 z-[9998] flex items-center justify-center">
        {/* 배경 오버레이 */}
        <div
          id="overlay"
          className="absolute inset-0 bg-black opacity-50"
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClose()
            }
          }}></div>

        {/* className={`p-1rem right-0 transition duration-500 ease-in-out w-screen inset-y-0 bg-white flex-1 flex-col h-dvh border-l-1 border-athens-gray max-w-15rem xl:w-15rem under-mobile:w-[70vw] ${ */}

        {/* 슬라이딩 패널 */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-white dark:bg-white shadow-xl transition-transform transform  duration-700 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } p-6 flex flex-col`}
          style={{ zIndex: 10000 }} // Ensure panel is above overlay
        >
          {children}
        </div>
      </div>
      {isAlertOpen && (
        <CustomAlertDialog
          open={isAlertOpen}
          title={alertTitle}
          description={alertDescription}
          buttons={alertButtons}
          onOpenChange={onAlertOpenChange}
        />
      )}
    </>
  )
}
