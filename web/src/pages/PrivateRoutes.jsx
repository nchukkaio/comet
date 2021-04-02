import { useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useLocation
} from 'react-router-dom'
import SettingsPage from '@/pages/settings/SettingsPage'
import ServerList from '@/components/server/list/ServerList'
import HomeSidebar from '@/pages/me/HomeSidebar'
import FeedPage from '@/pages/me/feed/FeedPage'
import FriendsPage from '@/pages/me/friends/FriendsPage'
import InboxPage from '@/pages/me/inbox/InboxPage'
import UserFolderPage from '@/pages/me/UserFolderPage'
import GroupPage from '@/pages/me/group/GroupPage'
import DmPage from '@/pages/me/dm/DmPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import ServerSidebar from '@/pages/server/ServerSidebar'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import PostPage from '@/pages/post/PostPage'
import ServerChannelPage from '@/pages/server/channel/ServerChannelPage'
import ServerFolderPage from '@/pages/server/ServerFolderPage'
import { useDataLoading } from '@/providers/DataProvider'
import { ServerProvider } from '@/providers/ServerProvider'
import { useCurrentUser, useCurrentUserLoading } from '@/providers/UserProvider'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/pages/LoadingScreen'

export default function PrivateRoutes() {
  const { serverId } = useParams()
  const loading = useDataLoading()
  const user = useCurrentUser()
  return (
    <>
      <AnimatePresence>
        {!!user && loading && <LoadingScreen />}
      </AnimatePresence>

      <Switch>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path={['/me', '/explore', '/server']}>
          <ServerList />
          <PrivateRoute path="/me">
            <HomeSidebar />
            <Switch>
              <PrivateRoute path="/me" exact>
                <Redirect to="/me/feed" />
              </PrivateRoute>
              <PrivateRoute path="/me/feed">
                <FeedPage />
              </PrivateRoute>
              <PrivateRoute path="/me/friends">
                <FriendsPage />
              </PrivateRoute>
              <PrivateRoute path="/me/inbox">
                <InboxPage />
              </PrivateRoute>
              <PrivateRoute path="/me/folder/:folderId">
                <UserFolderPage />
              </PrivateRoute>
              <PrivateRoute path="/me/group/:groupId">
                <GroupPage />
              </PrivateRoute>
              <PrivateRoute path="/me/dm/:userId">
                <DmPage />
              </PrivateRoute>
            </Switch>
          </PrivateRoute>
          <PrivateRoute path="/explore">
            <ExplorePage />
          </PrivateRoute>
          <ServerProvider>
            <PrivateRoute path="/server/:serverId">
              <ServerSidebar />
              <Switch>
                <PrivateRoute path="/server/:serverId" exact>
                  <Redirect to={`/server/${serverId}/posts`} />
                </PrivateRoute>
                <PrivateRoute path="/server/:serverId/posts" exact>
                  <ServerPostsPage />
                </PrivateRoute>
                <PrivateRoute path="/server/:serverId/posts/:postId">
                  <PostPage />
                </PrivateRoute>
                <PrivateRoute path="/server/:serverId/channel/:channelId">
                  <ServerChannelPage />
                </PrivateRoute>
                <PrivateRoute path="/server/:serverId/folder/:folderId">
                  <ServerFolderPage />
                </PrivateRoute>
              </Switch>
            </PrivateRoute>
          </ServerProvider>
        </PrivateRoute>
      </Switch>
    </>
  )
}

function PrivateRoute({ children, ...rest }) {
  const user = useCurrentUser()
  const userLoading = useCurrentUserLoading()
  const dataLoading = useDataLoading()
  return (
    <Route
      {...rest}
      render={() => {
        if (userLoading || dataLoading) return null
        return user ? children : <Redirect to="/login" />
      }}
    />
  )
}
