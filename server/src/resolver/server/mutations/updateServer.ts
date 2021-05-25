import { Field, ID, InputType } from 'type-graphql'
import { Length } from 'class-validator'
import { Server, ServerCategory, ServerPermission, User } from '@/entity'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Context } from '@/types'
import { uploadImageFileSingle } from '@/util'

@InputType()
export class UpdateServerInput {
  @Field(() => ID)
  serverId: string

  @Field({ nullable: true })
  @Length(2, 100)
  displayName?: string

  @Field({ nullable: true })
  @Length(0, 500)
  description?: string

  @Field({ nullable: true })
  isFeatured?: boolean

  @Field({ nullable: true })
  featuredPosition?: string

  @Field(() => ServerCategory, { nullable: true })
  category?: ServerCategory

  @Field(() => GraphQLUpload, { nullable: true })
  avatarFile?: FileUpload

  @Field(() => GraphQLUpload, { nullable: true })
  bannerFile?: FileUpload

  @Field(() => ID, { nullable: true })
  ownerId?: string

  @Field(() => ID, { nullable: true })
  systemMessagesChannelId?: string

  @Field(() => Boolean, { nullable: true })
  isDownvotesEnabled?: boolean
}

export async function updateServer(
  { em, userId, liveQueryStore }: Context,
  {
    serverId,
    displayName,
    description,
    isFeatured,
    featuredPosition,
    category,
    avatarFile,
    bannerFile,
    ownerId,
    systemMessagesChannelId,
    isDownvotesEnabled
  }: UpdateServerInput
): Promise<Server> {
  displayName = displayName.trim()
  description = description.trim()
  const user = await em.findOneOrFail(User, userId)
  const server = await em.findOneOrFail(Server, serverId, ['owner'])
  if ((isFeatured || featuredPosition) && !user.isAdmin)
    throw new Error('Must be global admin to set featured servers')
  if (ownerId && server.owner !== user)
    throw new Error('Must be server owner to change owner')
  await user.checkServerPermission(em, serverId, ServerPermission.ManageServer)
  em.assign(server, {
    displayName: displayName ?? server.displayName,
    description: description ?? server.description,
    isFeatured: isFeatured ?? server.isFeatured,
    featuredPosition: featuredPosition ?? server.featuredPosition,
    category: category ?? server.category,
    avatarUrl: avatarFile
      ? await uploadImageFileSingle(avatarFile, { width: 256, height: 256 })
      : server.avatarUrl,
    bannerUrl: bannerFile
      ? await uploadImageFileSingle(bannerFile, { width: 920, height: 540 })
      : server.bannerUrl,
    systemMessagesChannel:
      systemMessagesChannelId ?? server.systemMessagesChannel,
    isDownvotesEnabled: isDownvotesEnabled ?? server.isDownvotesEnabled
  })
  await em.persistAndFlush(server)
  liveQueryStore.invalidate(`Server:${serverId}`)
  return server
}
