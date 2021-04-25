import { Field, ID, InputType } from 'type-graphql'
import { Context } from '@/types'
import { Relationship, User } from '@/entity'

@InputType()
export class CloseDmInput {
  @Field(() => ID)
  userId: string
}

export async function closeDm(
  { em, userId: currentUserId, liveQueryStore }: Context,
  { userId }: CloseDmInput
): Promise<Relationship> {
  const user = await em.findOneOrFail(User, currentUserId)
  const [myData] = await user.getFriendData(em, userId)
  if (!myData.showChat) throw new Error('DM already closed')
  myData.showChat = false
  await em.persistAndFlush(myData)
  liveQueryStore.invalidate(`User:${userId}`)
  return myData
}