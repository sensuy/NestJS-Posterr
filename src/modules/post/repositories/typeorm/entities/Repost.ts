
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
	
	@PrimaryGeneratedColumn('increment')
	repostid: string;

	@ApiProperty({
		name: 'postFk',
		description: "Post's id",
		type: 'uuid',
		example: '5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
	})
	@ManyToOne(() => Post, (post) => post.postid, { nullable: false })
	@JoinColumn({ name: 'fk_postid' })
	postFk: Post;

	@ApiProperty({
		name: 'repostFk',
		description: "Repost's id",
		type: 'number',
		example: '5e9f8f8f-f8f8-f8f8-f8f8-f8f8f8f8f8f8',
	})
	@ManyToOne(() => Post, (post) => post.reposts, { nullable: false })
	@JoinColumn({ name: 'fk_repostid' })
	repostFk: Post;
}

export default Repost