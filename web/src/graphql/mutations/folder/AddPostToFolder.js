import { gql } from '@urql/core'
import {
  FOLDER_FRAGMENT,
  SERVER_FRAGMENT,
  USER_FRAGMENT
} from '@/graphql/fragments'

export const ADD_POST_TO_FOLDER = gql`
  mutation AddPostToFolder($folderId: ID!, $postId: ID!) {
    addPostToFolder(folderId: $folderId, postId: $postId) {
      ...FOLDER_FRAGMENT
      owner {
        ...USER_FRAGMENT
      }
      server {
        ...SERVER_FRAGMENT
      }
    }
  }
  ${FOLDER_FRAGMENT}
  ${USER_FRAGMENT}
  ${SERVER_FRAGMENT}
`
