import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DataType,
  DeletedAt,
  AllowNull
} from 'sequelize-typescript';
import { ID, Field, ObjectType } from 'type-graphql';
import { MinLength, MaxLength, IsEmail } from 'class-validator';

@Table
@ObjectType()
export class Users extends Model<Users> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  @Field(type => ID)
  id: string;

  @Column
  @Field()
  name: string;

  @Column
  @Field()
  @IsEmail()
  email: string;

  @Column
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @Field({ nullable: true })
  avgRate?: number;

  @Field({ nullable: true })
  @CreatedAt
  creationDate?: Date;

  @Field({ nullable: true })
  @UpdatedAt
  updatedOn?: Date;

  @Field({ nullable: true })
  @AllowNull(true)
  @DeletedAt
  @Column
  deletedAt?: Date;
}
