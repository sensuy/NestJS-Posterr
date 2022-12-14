import { ApiProperty } from '@nestjs/swagger';
import Post from '../../../../post/repositories/typeorm/entities/Post';
import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
class User {
	@ApiProperty({
		description: 'User\'s id',
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@PrimaryGeneratedColumn('uuid')
	userid: string;


	@ApiProperty({
		description: 'The sum of the user\'s posts, reposts and quotes',
		type: 'string',
		example: 'Reviewer',
	})
	@Index()
	@Column({ name: 'user_name', type: 'varchar', length: 14 })
	userName: string;

	@ApiProperty({
		description: 'The sum of the user\'s posts, reposts and quotes',
		type: 'number',
		example: 40,
	})
	@Column({ default: 0 })
	interactions: number;

	@ApiProperty({
		description: 'User\'s creation timestamp',
		type: 'string',
		examples: ['2021-05-01T00:00:00.000Z', 'Aug 31, 2022'],
	})
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[];
}

export default User;
