import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

describe('Date Pipe', () => {

  let pipe: PipeTransform;

  beforeEach(() => {
    pipe = new DatePipe('en');
  });

  it('should return en date', () => {
    const formatedDate = pipe.transform(new Date('2019-09-21T19:38:04.395Z'));
    expect(formatedDate).toBe('Sep 21, 2019');
  });

  it('should return formated date', () => {
    const formatedDate = pipe.transform(new Date('2019-09-21T19:38:04.395Z'), 'dd/MM/yyyy');
    expect(formatedDate).toBe('21/09/2019');
  });

});
