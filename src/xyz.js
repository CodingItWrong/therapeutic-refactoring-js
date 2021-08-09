import crypto from 'crypto';

class XYZFile {
  constructor(target) {
    this.target = target;
  }

  name() {
    const target = this.target;
    let filename = this.#publicationDay();
    filename += this.#category();
    filename += this.#kind();
    if (target.isPersonal) filename += `_${this.#age()}`;
    filename += `_${target.id}`;
    filename += `_${this.#noise()}`;
    filename += `_${this.#truncatedTitle()}`;
    filename += '.jpg';
    return filename;
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
