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

@Entity('quotes')
class Quotes {
	@ApiProperty({
		description: "Post's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@PrimaryGeneratedColumn('uuid')
	quoteid: string;

	@ApiProperty({
		description: "User's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@Column({ name: 'fk_userid' })
	fkUserId: string;

	@ApiProperty({
		description: "Post's id",
		type: 'uuid',
		example: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
	})
	@Column({ name: 'fk_posterid', nullable: false })
	fkIdPoster: string;

	@ApiProperty({
		description: "Typed content of the quote",
		type: 'string',
		example: 'I do not know what to say',
	})
	@Column()
	content: string;

	@ApiProperty({
		description: "Quote's creation timestamp",
		type: 'string',
		example: '2021-05-01T00:00:00.000Z',
	})
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@ManyToOne(() => User, (user) => user.quotes, { nullable: false })
	@JoinColumn({ name: 'fk_iduser' })
	user: User;

	@ManyToOne(() => Post, (post) => post.quote, { nullable: false })
	@JoinColumn({ name: 'fk_posterid' })
	post: Post;
}

export default Quotes;