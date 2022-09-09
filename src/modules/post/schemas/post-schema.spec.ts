import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import { CreatePostSchema, CreateRepostSchema } from "./post-schema";

describe('Validate CreatePostSchema', () => {;
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
});