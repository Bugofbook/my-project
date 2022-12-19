import { browserFileWriteCsv } from './browser-file-write-csv';

describe('browserFileWriteCsv', () => {
  it('should work', () => {
    expect(browserFileWriteCsv()).toEqual('browser-file-write-csv');
  });
});
