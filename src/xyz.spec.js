import {xyzFilename} from './xyz';

function disallowUndefinedProperties(obj) {
  const handler = {
    get(target, property) {
      if (property in target) {
        return target[property];
      }

      throw new Error(`Property '${property}' is not defined`);
    },
  };

  return new Proxy(obj, handler);
}

describe('xyz', () => {
  describe('xyzFilename', () => {
    it('works', () => {
      const target = disallowUndefinedProperties({
        publishOn: new Date(2021, 2, 7),
        xyzCategoryPrefix: 'abc',
        kind: 'unicorn',
        isPersonal: false,
        id: 1337,
        title: 'magic & superglue',
      });
      const subject = xyzFilename(target);
      expect(subject).toMatch(/07abcunicorn_1337_[0-9a-f]{8}_magicsuper\.jpg/);
    });
  });
});
