import { isomorphicFileWriteExceljs } from './isomorphic-file-write-exceljs';

describe('isomorphicFileWriteExceljs', () => {
  it('should work', () => {
    expect(isomorphicFileWriteExceljs()).toEqual(
      'isomorphic-file-write-exceljs'
    );
  });
});
