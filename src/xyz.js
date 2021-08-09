import crypto from 'crypto';

export class XYZFile {
  constructor(target) {
    this.target = target;
  }

  name() {
    const target = this.target;
    // File format:
    // [day of month zero-padded][three-letter prefix] \
    // _[kind]_[age_if_kind_personal]_[target.id] \
    // _[8 random chars]_[10 first chars of title].jpg
    let filename = `${target.publishOn.getDate().toString().padStart(2, '0')}`;
    filename += `${target.xyzCategoryPrefix}`;
    filename += `${target.kind.replace(/_/g, '')}`;
    if (target.isPersonal)
      filename += `_${String(target.age || 0).padStart(3, '0')}`;
    filename += `_${target.id.toString()}`;
    const shasum = crypto.createHash('sha1');
    shasum.update((Math.random() * 10000).toString());
    filename += `_${shasum.digest('hex').substring(0, 8)}`;
    const truncatedTitle = target.title
      .replace(/[^\[a-z\]]/gi, '')
      .toLowerCase();
    const truncateTo = truncatedTitle.length > 10 ? 10 : truncatedTitle.length;
    filename += `_${truncatedTitle.substring(0, truncateTo)}`;
    filename += '.jpg';
    return filename;
  }
}

export function xyzFilename(target) {
  return new XYZFile(target).name();
}
