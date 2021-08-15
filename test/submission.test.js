const path = require('path');
const fs = require('fs');
const manifest = require('../manifest.json');

describe('manifest.json', () => {
  it('has a cool name', () => {
    expect(manifest.name).not.toBe('Valet Game');
  });
  it('has a great description', () => {
    expect(manifest.description).not.toContain('TKTKTK');
  });
  Object.keys(manifest.images).forEach((imageKey) => {
    it(`has valid image: ${imageKey}`, () => {
      const relativePath = manifest.images[imageKey];
      const absolutePath = path.join(__dirname, '..', relativePath);

      expect(fs.existsSync(absolutePath)).toBe(true);
    });
  });
  it('has the correct game category', () => {
    expect(manifest.categories).toContain('Desktop');
  });
});
