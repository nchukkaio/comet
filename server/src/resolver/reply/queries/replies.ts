import { Context } from '@/types'
import { Reply } from '@/entity'
import { Field, ID, InputType } from 'type-graphql'

@InputType()
export class RepliesInput {
  @Field(() => Boolean, { defaultValue: true })
  unreadOnly: boolean = true
}

export async function replies(
  { em, userId }: Context,
  { unreadOnly }: RepliesInput
): Promise<Reply[]> {
  return em.find(
    Reply,
    unreadOnly ? { user: userId, isRead: false } : { user: userId },
    [
      'user',
      'comment.author.user',
      'comment.author.roles',
      'comment.post.server',
      'comment.parentComment.author.user',
      'comment.parentComment.author.roles'
    ],
    { id: 'DESC' }
  )
}