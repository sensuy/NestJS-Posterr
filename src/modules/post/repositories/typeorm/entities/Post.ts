import { ApiProperty } from '@nestjs/swagger';
import User from '../../../../user/repositories/typeorm/entities/User';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

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
	userid: string;

	@ApiProperty({
		description: "Typed content of the post",
		type: 'string',
		example: 'It is a beautiful day!',
	})
	@Column({ type: 'varchar', length: 777 })
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


	@ManyToMany(() => Post, { cascade: true })
	@JoinTable({
		name: 'repost',
		joinColumn: {
			name: 'repostid',
		},
		inverseJoinColumn: {
			name: 'postid',
		}
	})
	reposts: Post[];

	@ManyToMany(() => Post, { cascade: true })
	@JoinTable({
		name: 'quote',
		joinColumn: {
			name: 'quoteid',
		},
		inverseJoinColumn: {
			name: 'postid',
		}
	})
	quotes: Post[];
}

export default Post;
