import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
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
	@Column({ name: 'fk_iduser' })
	fkIdUser: string;

	@ApiProperty({
		description: "Typed content of the post",
		type: 'string',
		example: 'It is a beautiful day!',
	})
	@Column()
	content: string;

	@ApiProperty({
		description: "Post's creation timestamp",
		type: 'string',
		example: '2021-05-01T00:00:00.000Z',
	})
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}

export default Post;
