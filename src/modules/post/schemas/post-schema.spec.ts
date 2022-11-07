import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import { CreatePostSchema, CreateQuoteSchema, CreateRepostSchema } from "./post-schema";

describe('Validate CreatePostSchema', () => {
  let validatePipe: JoiValidationPipe
  beforeEach(async () => {
    validatePipe = new JoiValidationPipe(CreatePostSchema);
  });

  it('CreatePostSchema should be defined', () => {
    expect(validatePipe).toBeDefined();
  });

  it('should return bad request if userid is not defined', () => {
    const dto = {
      content: 'I love this post!'
    };

    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" is required');
  });

  it('should return bad request if userid is not a uuid', () => {
    const dto = {
      userid: 'not-a-uuid',
      content: 'I love this post!'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" must be a valid GUID');
  });

  it('should return bad request if content is not defined', () => {
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"content" is required');
  });

  it('should return bad request if content has length great than 777', () => {
    const content = new Array(800).join('a');
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content
    };
    expect(() => validatePipe.transform(dto, { type: "body" }))
      .toThrowError('"content" length must be less than or equal to 777 characters long');
  });
});

describe('Validate CreateRepostSchema', () => {
  let validatePipe: JoiValidationPipe
  beforeEach(async () => {
    validatePipe = new JoiValidationPipe(CreateRepostSchema);
  });

  it('CreateRepostSchema should be defined', () => {
    expect(validatePipe).toBeDefined();
  });

  it('should return bad request if postid is not defined', () => {
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"postid" is required');
  });

  it('should return bad request if postid is not a uuid', () => {
    const dto = {
      postid: 'not-a-uuid',
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"postid" must be a valid GUID');
  });

  it('should return bad request if userid is not defined', () => {
    const dto = {
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" is required');
  });

  it('should return bad request if userid is not a uuid', () => {
    const dto = {
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      userid: 'not-a-uuid'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" must be a valid GUID');
  });

});

describe('Validate CreateQuoteSchema', () => {
  let validatePipe: JoiValidationPipe
  beforeEach(async () => {
    validatePipe = new JoiValidationPipe(CreateQuoteSchema);
  });

  it('CreateQuoteSchema should be defined', () => {
    expect(validatePipe).toBeDefined();
  });

  it('should return bad request if userid is not defined', () => {
    const dto = {
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I love this post!'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" is required');
  });

  it('should return bad request if userid is not a uuid', () => {
    const dto = {
      userid: 'not-a-uuid',
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I love this post!'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"userid" must be a valid GUID');
  });

  it('should return bad request if postid is not defined', () => {
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content: 'I love this post!'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"postid" is required');
  });

  it('should return bad request if postid is not a uuid', () => {
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      postid: 'not-a-uuid',
      content: 'I love this post!'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"postid" must be a valid GUID');
  });

  it('should return bad request if content is not defined', () => {
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d'
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"content" is required');
  });

  it('should return bad request if content has length great than 140', () => {
    const content = new Array(142).join('a');
    const dto = {
      userid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      postid: 'b3dac166-4006-455f-a9c3-9e2a69568b6d',
      content
    };
    expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('"content" length must be less than or equal to 140 characters long');
  });
});