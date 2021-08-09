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
        publishOn: new Date(2021, 3, 14),
        xyzCategoryPrefix: 'abc',
        kind: 'unicorn',
        isPersonal: false,
        id: 1337,
        title: 'magic & superglue',
      });
      const subject = xyzFilename(target);
      expect(subject).toEqual('something');
    });
  });
});
