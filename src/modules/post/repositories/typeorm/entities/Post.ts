import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('post')
class Post {
	@PrimaryGeneratedColumn('uuid')
	idpost: string;

	@Column({ name: 'fk_iduser' })
	fkIdUser: string;

	@Column()
	content: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
}

export default Post;
