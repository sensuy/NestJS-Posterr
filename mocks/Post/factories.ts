import { CreatePostDto } from "modules/post/dtos/createPost.dto"
import { CreateQuoteDto } from "modules/post/dtos/createQuote.dto"
import { CreateRepostDTO } from "modules/post/dtos/createRepost.dto"


export const makeFakePost = (dto: CreatePostDto) => {
  return {
    ...dto,
    postid: '613711df-713d-4e1d-b778-9124ce7a08b1',
    createdAt: '2022-11-20T18:08:49.016Z',
    quotes: [],
    reposts: []
  }
}

export const makeFakeRepost = (dto: CreateRepostDTO) => {
  return {
    userid: dto.userid,
    content: '',
    reposts: [
      {
        postid: dto.postid,
        userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
        content: 'I love this post!',
        createdAt: '2022-08-11T07:07:07.188Z',
        reposts: []
      }
    ],
    quotes: [],
    postid: '84dd6d96-0b79-49c8-974f-f4d4c93277c1',
    createdAt: '2022-08-28T18:39:20.219Z'
  }
}

export const makeFakeQuote = (dto: CreateQuoteDto) => {
  return {
    userid: dto.userid,
    content: dto.content,
    quotes: [
      {
        postid: dto.postid,
        userid: 'd101be29-db6a-47fe-b8ee-fc1fa9d1ccbe',
        content: 'It\'s a beautiful day!',
        createdAt: '2022-08-21T00:57:49.065Z',
        quotes: []
      }
    ],
    reposts: [],
    postid: 'dd80f721-2a56-4060-998e-ec4abf2542d2',
    createdAt: '2022-08-28T19:25:45.422Z'
  }
}

export const makeFakeArrayPosts = () => {
  return [
    {
      postid: '613711df-713d-4e1d-b778-9124ce7a08b1',
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I love this post!',
      createdAt: '2022-08-11T07:07:07.188Z',
      reposts: [],
      quotes: []
    },
    {
      postid: '84dd6d96-0b79-49c8-974f-f4d4c93277c1',
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I love this post!',
      createdAt: '2022-08-11T07:07:07.188Z',
      reposts: [],
      quotes: []
    }
  ]
}