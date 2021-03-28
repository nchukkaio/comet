import { IconSettings } from '@/lib/Icons'
import React from 'react'
import Tippy from '@tippyjs/react'
import { useUser } from '@/components/providers/UserProvider'
import UserAvatar from '@/components/avatars/UserAvatar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function SidebarUserInfo() {
  const [currentUser] = useUser()
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-0 left-18 right-0 w-60 h-12 px-3 dark:bg-gray-850 flex items-center">
      <UserAvatar
        user={currentUser}
        size={9}
        showOnline
        dotClassName="w-2.5 h-2.5 ring-3 dark:ring-gray-850"
      />

      <div className="ml-3">
        <div className="text-sm text-primary font-medium">
          {currentUser.name}
        </div>
        <div className="text-xs text-tertiary font-medium">
          #{currentUser.tag}
        </div>
      </div>

      <Tippy content={t('settings.title')}>
        <Link
          to="/settings"
          className="p-1.5 rounded dark:hover:bg-gray-750 transition cursor-pointer ml-auto"
        >
          <IconSettings className="w-5 h-5 text-tertiary" />
        </Link>
      </Tippy>
    </div>
  )
}