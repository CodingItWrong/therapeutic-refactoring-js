import crypto from 'crypto';

class XYZFile {
  constructor(target) {
    this.target = target;
  }

  name() {
    const target = this.target;
    const filename = [];
    filename.push(this.#prefix());
    if (target.isPersonal) filename.push(this.#age());
    filename.push(target.id);
    filename.push(this.#noise());
    filename.push(this.#truncatedTitle());
    return `${filename.join('_')}.jpg`;
  }

  #prefix() {
    return [this.#publicationDay(), this.#category(), this.#kind()].join('');
  }

  #truncatedTitle() {
    return this.target.title
      .toLowerCase()
      .replace(/[^\[a-z\]]/g, '')
      .substring(0, 10);
  }

  #noise() {
    const shasum = crypto.createHash('sha1');
    shasum.update((Math.random() * 10000).toString());
    return shasum.digest('hex').substring(0, 8);
  }

  #age() {
    return String(this.target.age || 0).padStart(3, '0');
  }

  #publicationDay() {
    return this.target.publishOn.getDate().toString().padStart(2, '0');
  }

  #category() {
    return this.target.xyzCategoryPrefix;
  }

  #kind() {
    return this.target.kind.replace(/_/g, '');
  }
}

export function xyzFilename(target) {
  return new XYZFile(target).name();
}
