import { useEffect, useRef, useState } from 'react'
// import { ToggleButton, CircleButton } from '@extension/ui'
import { CircleButton, PortalContainerContext } from '@extension/ui'
import { SlideMainPage } from './pages/main/SlideMainPage'
// import { exampleThemeStorage } from '@extension/storage'
// import { t } from '@extension/i18n'

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const portalContainerRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    console.log('content ui loaded')
    if (portalContainerRef.current) {
      setPortalContainer(portalContainerRef.current)
    }
  }, [])

  // const alert = (text: string) => () => {
  //   alert(text)
  // }

  const togglePanel = () => {
    setIsPanelOpen(prev => !prev)
  }

  return (
    <PortalContainerContext.Provider value={portalContainer}>
      <div ref={portalContainerRef} id="my-portal-container" />
      <CircleButton onClick={togglePanel}></CircleButton>
      <SlideMainPage isOpen={isPanelOpen} onClose={togglePanel} />
      {/* <SlidePanel isOpen={isPanelOpen} onClose={togglePanel} /> */}
    </PortalContainerContext.Provider>
    // <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
    //   <div className="flex gap-1 text-blue-500">
    //     Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx test</strong> and save to reload.w
    //   </div>
    //   <ToggleButton onClick={exampleThemeStorage.toggle}>{t('toggleTheme')}</ToggleButton>
    // </div>
  )
}
