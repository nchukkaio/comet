import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver
} from 'type-graphql'
import { Message } from '@/entity'
import { Context } from '@/types'
import { ChangePayload, SubscriptionTopic } from '@/resolver/subscriptions'
import { MessagesArgs, MessagesResponse, messages } from './queries'
import {
  createMessage,
  CreateMessageInput,
  updateMessage,
  UpdateMessageInput,
  deleteMessage,
  DeleteMessageInput,
  pinMessage,
  PinMessageInput,
  unpinMessage,
  UnpinMessageInput
} from './mutations'

@Resolver()
export class MessageResolver {
  // --- Queries ---
  @Authorized()
  @Query(() => [MessagesResponse])
  async messages(
    @Ctx() ctx: Context,
    @Args()
    args: MessagesArgs
  ): Promise<MessagesResponse[]> {
    return messages(ctx, args)
  }

  // --- Mutations ---
  @Authorized()
  @Mutation(() => Message)
  async createMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: CreateMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return createMessage(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Message)
  async updateMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: UpdateMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return updateMessage(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: DeleteMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<boolean> {
    return deleteMessage(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Message)
  async pinMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: PinMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return pinMessage(ctx, input, notifyMessageChanged)
  }

  @Authorized()
  @Mutation(() => Message)
  async unpinMessage(
    @Ctx() ctx: Context,
    @Arg('input') input: UnpinMessageInput,
    @PubSub(SubscriptionTopic.MessageChanged)
    notifyMessageChanged: Publisher<ChangePayload>
  ): Promise<Message> {
    return unpinMessage(ctx, input, notifyMessageChanged)
  }
}