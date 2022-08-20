import { Test, TestingModule } from "@nestjs/testing";
import { start } from "repl";
import DateFormatService from "shared/utils/date-format.service";
import PostService from "../services/post.service";
import PostController from "./post.controller"




describe('Testing post controller', () => {
	let controller: PostController;

	const mockDateFormatService = {
	}

	const mockPostService = {
		createPost: jest.fn(dto => {
			return {
				postid: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
				...dto,
				created_at: new Date()
			}
		}),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PostController],
			providers: [DateFormatService, PostService]
		})
			.overrideProvider(DateFormatService)
			.useValue(mockDateFormatService)
			.overrideProvider(PostService)
			.useValue(mockPostService)
			.compile();

		controller = module.get<PostController>(PostController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return a created posts', async () => {
		const post = await controller.createPost({ userid: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a', content: 'test' });
		expect(post).toEqual({
			postid: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
			userid: 'f0a0a0a0-a0a0-0a0a-0a0a-0a0a0a0a0a0a',
			content: 'test',
			created_at: expect.any(Date)
		});
	});

});