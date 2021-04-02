import { useStore } from '@/hooks/useStore'
import { IconFolder } from '@/components/ui/icons/Icons'
import Tippy from '@tippyjs/react'
import { useTranslation } from 'react-i18next'

export default function ShowFoldersButton() {
  const [showFolders, setShowFolders] = useStore(s => [
    s.showFolders,
    s.setShowFolders
  ])
  const { t } = useTranslation()

  return (
    <Tippy content={showFolders ? t('folders.hide') : t('folders.show')}>
      <div
        className="highlightable"
        onClick={() => setShowFolders(!showFolders)}
      >
        <IconFolder className="w-5 h-5" />
      </div>
    </Tippy>
  )
}
