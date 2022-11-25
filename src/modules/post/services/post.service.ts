import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import IPostRepository from "../repositories/IPostRepository";
import IUserRepository from "modules/user/repositories/IUserRepository";
import Post from "../repositories/typeorm/entities/Post";
import { IPaginationByDate } from "shared/interfaces/IPagination";
import DateFormatService from "shared/utils/date-format.service";
import { CreatePostDto } from "../dtos/createPost.dto";
import { CreateQuoteDto } from "../dtos/createQuote.dto";
import { CreateRepostDTO } from "../dtos/createRepost.dto";
import { MAX_LIMIT_POSTS_PER_DAY } from "../constants/post.constants";


@Injectable()
class PostService {

  constructor(
    @Inject('IPostRepository') private postRepository: IPostRepository,
    @Inject('IUserRepository') private userRepository: IUserRepository,
    private dateFormatService: DateFormatService
  ) { }


  async listUserPosts(userid: string, queryParams: IPaginationByDate): Promise<Post[]> {

    const user = await this.userRepository.listById(userid);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    if (queryParams.startDate) {
      const startDate = new Date(queryParams.startDate);
      Object.assign(queryParams, { startDate });
    }

    if (queryParams.endDate) {
      const endDate = this.dateFormatService.addDays(queryParams.endDate, 1);
      Object.assign(queryParams, { endDate });
    }

    let posts: Post[];
    try {
      posts = await this.postRepository.listPostsByUserId(userid, queryParams);
    } catch (error) {
      throw new HttpException('List users posts failed.', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return posts;
  }

  async listLatestPosts(queryParams: IPaginationByDate): Promise<Post[]> {

    if (queryParams.startDate) {
      const startDate = new Date(queryParams.startDate);
      Object.assign(queryParams, { startDate });
    }

    if (queryParams.endDate) {
      const endDate = this.dateFormatService.addDays(queryParams.endDate, 1);
      Object.assign(queryParams, { endDate });
    }

    let posts: Post[];
    try {
      posts = await this.postRepository.listLatestPosts(queryParams);
    } catch (error) {
      throw new HttpException('List posts failed.', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return posts;
  }

  async createPost(payload: CreatePostDto): Promise<Post> {

    const user = await this.userRepository.listById(payload.userid);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    const initDate = this.dateFormatService.timesTampZeroHour(new Date());
    const finalDate = this.dateFormatService.addDays(initDate, 1);

    const count = await this.postRepository.countUserPostByDate(
      payload.userid,
      initDate,
      finalDate
    );

    if (count >= MAX_LIMIT_POSTS_PER_DAY) {
      throw new HttpException(
        'You have reached the limit of posts per day',
        HttpStatus.FORBIDDEN
      );
    }

    let post = this.postRepository.create(payload);

    [post,] = await Promise.all([
      this.postRepository.save(post),
      this.userRepository.incrementInteractions(payload.userid)
    ]);

    return post;
  }

  async createRepost(payload: CreateRepostDTO): Promise<Post> {
    const user = await this.userRepository.listById(payload.userid);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    const initDate = this.dateFormatService.timesTampZeroHour(new Date());
    const finalDate = this.dateFormatService.addDays(initDate, 1);

    const count = await this.postRepository.countUserPostByDate(
      payload.userid,
      initDate,
      finalDate
    );

    if (count >= 5) {
      throw new HttpException(
        'You have reached the limit of posts per day',
        HttpStatus.FORBIDDEN
      );
    }

    const post = await this.postRepository.verifyRepostById(payload.postid);

    if (!post) {
      throw new HttpException('Post does not exist.', HttpStatus.NOT_FOUND);
    }

    if (post.reposts.length >= 1) {
      throw new HttpException('You can not repost a repost', HttpStatus.FORBIDDEN);
    }

    if (post.userid === payload.userid) {
      throw new HttpException('You cannot repost your own post', HttpStatus.FORBIDDEN);
    }

    const repostPayload: CreatePostDto = {
      userid: payload.userid,
      content: ''
    };

    let repost = this.postRepository.create(repostPayload);
    repost.reposts = [post];

    try {
      [repost,] = await Promise.all([
        this.postRepository.save(repost),
        this.userRepository.incrementInteractions(payload.userid)
      ]);
    } catch (error) {
      throw new HttpException('Repost creation failed', HttpStatus.SERVICE_UNAVAILABLE);
    }

    return repost;
  }

  async createQuote(payload: CreateQuoteDto): Promise<Post> {
    const user = await this.userRepository.listById(payload.userid);
    if (!user) {
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND);
    }

    const initDate = this.dateFormatService.timesTampZeroHour(new Date());
    const finalDate = this.dateFormatService.addDays(initDate, 1);

    const count = await this.postRepository.countUserPostByDate(
      payload.userid,
      initDate,
      finalDate
    );

    if (count >= 5) {
      throw new HttpException(
        'You have reached the limit of posts per day',
        HttpStatus.FORBIDDEN
      );
    }

    const post = await this.postRepository.verifyQuoteById(payload.postid);

    if (!post) {
      throw new HttpException('Post does not exist.', HttpStatus.NOT_FOUND);
    }

    if (post.quotes.length >= 1) {
      throw new HttpException('You can not quote a quote', HttpStatus.FORBIDDEN);
    }

    if (post.userid === payload.userid) {
      throw new HttpException('You cannot quote your own post', HttpStatus.FORBIDDEN);
    }

    const quotePayload: CreatePostDto = {
      userid: payload.userid,
      content: payload.content
    };

    let quote = this.postRepository.create(quotePayload);
    quote.quotes = [post];

    try {
      [quote,] = await Promise.all([
        this.postRepository.save(quote),
        this.userRepository.incrementInteractions(payload.userid)
      ]);
    } catch (error) {
      throw new HttpException('Quote creation failed', HttpStatus.SERVICE_UNAVAILABLE);
    }
    return quote;
  }


}

export default PostService;