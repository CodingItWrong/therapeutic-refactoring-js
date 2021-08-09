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
    const target = overrides =>
      disallowUndefinedProperties({
        publishOn: new Date(2021, 2, 7),
        xyzCategoryPrefix: 'abc',
        kind: 'magic_unicorn',
        isPersonal: false,
        id: 1337,
        title: 'I <3 Sparkles!!1!',
        ...overrides,
      });

    it('works', () => {
      const subject = xyzFilename(target());
      expect(subject).toMatch(
        /07abcmagicunicorn_1337_[0-9a-f]{8}_isparkles\.jpg/,
      );
    });

    it('leaves square brackets?', () => {
      const subject = xyzFilename(target({title: 'i[sparkle]s'}));
      expect(subject).toMatch(
        /07abcmagicunicorn_1337_[0-9a-f]{8}_i\[sparkle\]\.jpg/,
      );
    });

    it('personalizes', () => {
      const subject = xyzFilename(target({isPersonal: true, age: 42}));
      expect(subject).toMatch(
        /07abcmagicunicorn_042_1337_[0-9a-f]{8}_isparkles.jpg/,
      );
    });
  });
});
