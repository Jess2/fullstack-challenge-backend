import 'reflect-metadata';
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  _id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field() // field 부분을 빼면 graphql에서 속성이 안보이도록 hide할 수 있다.
  @Property({ type: 'text' })
  title!: string;
}