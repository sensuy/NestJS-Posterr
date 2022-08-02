import { ApiProperty } from '@nestjs/swagger';
import User from '../../../../user/repositories/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './Post';

@Entity('repost')
class Repost {
	@ApiProperty({
		description: "Repost's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@PrimaryGeneratedColumn('uuid')
	repostid: string;

	@ApiProperty({
		description: "User's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@Column({ name: 'fk_userid', nullable: false })
	fkUserId: string;

	@ApiProperty({
		description: "Post's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@Column({ name: 'fk_postid', nullable: false })
	fkPostId: string;

	@ApiProperty({
		description: "Repost's creation timestamp",
		type: 'string',
		example: '2021-05-01T00:00:00.000Z',
	})
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.reposts, { nullable: false })
	@JoinColumn({ name: 'fk_userid' })
	user: User;

	@ManyToOne(() => Post, (post) => post.repost, { nullable: false })
	@JoinColumn({ name: 'fk_postid' })
	post: Post;
}

export default Repost