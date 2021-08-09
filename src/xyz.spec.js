import {xyzFilename} from './xyz';

describe('xyz', () => {
  describe('xyzFilename', () => {
    it('works', () => {
      const stub = undefined;
      const subject = xyzFilename(stub);
      expect(subject).toEqual('something');
    });
  });
});
