import { JoiValidationPipe } from "shared/utils/JoiValidationPipe";
import { FindUserSchema, SeedUserSchema } from "./user-schema";

describe('UserSchemas', () => {

  describe('SeedUserSchema', () => {
    let validatePipe: JoiValidationPipe
    beforeEach(async () => {
      validatePipe = new JoiValidationPipe(SeedUserSchema);
    });

    it('SeedUserSchema should be defined', () => {
      expect(validatePipe).toBeDefined();
    });

    it('should return bad request if payload is not an array', () => {
      const dto = {};
      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName must be an array');
    });

    it('should return bad request if userName is not defined', () => {
      const dto = [{}];

      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName is a required field');
    });

    it('should return bad request if userName length is bigger than 14 characters', () => {
      const dto = [{
        userName: '123456789012345'
      }];

      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName cannot be more than 14 characters');
    });

    it('should return bad request if userName has some special character', () => {
      const dto = [{
        userName: '123450@#$%'
      }];

      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName must be alphanumeric');
    });

    it('should return a bad request if userName has an empty string', () => {
      const dto = [{
        userName: ''
      }];

      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName cannot be an empty field');
    });

    it('should return a bad request if userName is not string type', () => {
      const dto = [{
        userName: {}
      }];
      
      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName must be a string');
    });
  });

  describe('FindUserSchema', () => {
    let validatePipe: JoiValidationPipe
    beforeEach(async () => {
      validatePipe = new JoiValidationPipe(FindUserSchema);
    });

    it('FindUserSchema should be defined', () => {
      expect(validatePipe).toBeDefined();
    });

    it('should return bad request if userName is not defined', () => {
      const userName = undefined;

      expect(() => validatePipe.transform(userName, { type: "body" })).toThrowError('userName is a required field');
    });

    it('should return bad request if userName length is bigger than 14 characters', () => {
      const userName = '123456789012345'

      expect(() => validatePipe.transform(userName, { type: "body" })).toThrowError('userName cannot be more than 14 characters');
    });

    it('should return bad request if userName has some special character', () => {
      const userName = '123450@#$%'
      

      expect(() => validatePipe.transform(userName, { type: "body" })).toThrowError('userName must be alphanumeric');
    });

    it('should return a bad request if userName has an empty string', () => {
      const userName = '';

      expect(() => validatePipe.transform(userName, { type: "body" })).toThrowError('userName cannot be an empty field');
    });

    it('should return a bad request if userName is not string type', () => {
      const dto = {};

      expect(() => validatePipe.transform(dto, { type: "body" })).toThrowError('userName must be a string');
    });
  })
});