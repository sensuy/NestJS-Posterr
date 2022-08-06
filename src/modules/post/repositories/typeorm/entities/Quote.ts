import User from '../../../../user/repositories/typeorm/entities/User';
import {
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm';
import Post from './Post';
import { ApiProperty } from '@nestjs/swagger';

@Entity('quotes')
class Quote {
	@ApiProperty({
		description: "Quote's id",
		type: 'number',
		example: 3452
	})
	@PrimaryGeneratedColumn('increment')
	quoteid: string;

	@ManyToOne(() => User, (user) => user.quotes, { nullable: false })
	@JoinColumn({ name: 'fk_iduser' })
	user: User;

	@ManyToOne(() => Post, (post) => post.postid, { nullable: false })
	@JoinColumn({ name: 'fk_posterid' })
	post: Post;
}

export default Quote;