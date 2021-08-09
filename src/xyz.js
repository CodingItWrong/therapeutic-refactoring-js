import crypto from 'crypto';

export class XYZFile {
  constructor(target) {
    this.target = target;
  }

  name() {
    const target = this.target;
    let filename = `${target.publishOn.getDate().toString().padStart(2, '0')}`;
    filename += `${target.xyzCategoryPrefix}`;
    filename += `${target.kind.replace(/_/g, '')}`;
    if (target.isPersonal)
      filename += `_${String(target.age || 0).padStart(3, '0')}`;
    filename += `_${target.id.toString()}`;
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
}

export function xyzFilename(target) {
  return new XYZFile(target).name();
}
