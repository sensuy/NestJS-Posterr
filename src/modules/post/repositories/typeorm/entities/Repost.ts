
import { ApiProperty } from '@nestjs/swagger';
import {
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
		type: 'number',
		example: 3452
	})
	@PrimaryGeneratedColumn('increment')
	repostid: string;

	@ManyToOne(() => Post, (post) => post.postid, { nullable: false })
	@JoinColumn({ name: 'fk_postid' })
	postFk: Post;

	@ManyToOne(() => Post, (post) => post.reposts, { nullable: false })
	@JoinColumn({ name: 'fk_repostid' })
	repostFk: Post;
}

export default Repost