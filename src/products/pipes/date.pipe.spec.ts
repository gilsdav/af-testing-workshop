import { PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/*
  Règles:
  - Le pipe date avec la locale "en" doit renvoyer une date au format "MMM dd, yyy" (exemple: Sep 21, 2019) par défaut
  - Si le pipe reçois un string de formatage en paramètren il soit retourner la date dans ce bon format (exemple de format: 'dd/MM/yyyy')
*/

describe('Date Pipe', () => {

  let pipe: PipeTransform;
  const dateToFormat = new Date('2019-09-21T19:38:04.395Z');

  beforeEach(() => {
    pipe = new DatePipe('en');
  });

  it('should return en date', () => {
    const formatedDate = pipe.transform(dateToFormat);
    expect(formatedDate).toBe('Sep 21, 2019');
  });

  it('should return formated date', () => {
    const formatedDate = pipe.transform(dateToFormat, 'dd/MM/yyyy');
    expect(formatedDate).toBe('21/09/2019');
  });

});
