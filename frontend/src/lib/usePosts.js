import { gql } from 'graphql-request'
import { useInfiniteQuery } from 'react-query'
import { request } from '@/lib/Request'

export const fetchPosts = async ({ queryKey, pageParam = 0 }, ctx = null) => {
  const [_key, variables] = queryKey
  const { posts } = await request(
    ctx,
    gql`
      query posts(
        $sort: PostSort
        $page: Int
        $time: TimeFilter
        $joinedOnly: Boolean
        $planet: String
        $galaxy: String
        $username: String
        $search: String
      ) {
        posts(
          sort: $sort
          page: $page
          time: $time
          joinedOnly: $joinedOnly
          planet: $planet
          galaxy: $galaxy
          username: $username
          search: $search
        ) {
          page
          nextPage
          posts {
            id
            id36
            title
            sticky
            textContent
            linkUrl
            imageUrls
            relativeUrl
            commentCount
            rocketCount
            repostCount
            rocketed
            thumbnailUrl
            logoUrl
            domain
            meta {
              title
              description
            }
            planet {
              name
              description
              color
              userCount
              avatarUrl
            }
            author {
              username
              name
              avatarUrl
            }
            timeSince
            timeSinceEdited
          }
        }
      }
    `,
    { ...variables, page: pageParam }
  )
  return posts
}

export const usePosts = variables =>
  useInfiniteQuery(['posts', variables], fetchPosts, {
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    select: data => data.pages.map(page => page.posts).flat()
  })