import { ApiProperty } from '@nestjs/swagger';
import User from '../../../../user/repositories/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import Quotes from './Quote';
import Repost from './Repost';
import Quote from './Quote';

@Entity('post')
class Post {
	@ApiProperty({
		description: "Post's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@PrimaryGeneratedColumn('uuid')
	postid: string;

	@ApiProperty({
		description: "User's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@Column({ name: 'fk_userid' })
	fkUserId: string;

	@ApiProperty({
		description: "Typed content of the post",
		type: 'string',
		example: 'It is a beautiful day!',
	})
	@Column({type: 'varchar', length: 777})
	content: string;

	@ApiProperty({
		description: "Post's creation timestamp",
		type: 'string',
		example: '2021-05-01T00:00:00.000Z',
	})
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.posts, { nullable: false })
	@JoinColumn({ name: 'fk_userid' })
	user: User;

	@OneToMany(() => Repost, (repost) => repost.postFk, { nullable: false })
	post: Repost[];

	@OneToMany(() => Repost, (repost) => repost.repostFk, { nullable: false })
	reposts: Repost[];

	@OneToMany(() => Quote, (quote) => quote.post, { nullable: false })
	quotes: Repost[];
}

export default Post;
