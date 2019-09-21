import { RomanizeService } from './romanize.service';

/*
1) Un nombre en chiffres romains se lit de gauche à droite ;
2) Un même symbole n'est pas employé quatre fois de suite (sauf M) ;
3) Tout symbole qui suit un symbole de valeur supérieure ou égale s’ajoute à celui-ci (exemple : 6 s'écrit VI) ;
4) Tout symbole qui précède un symbole de valeur supérieure se soustrait à ce dernier ;
  * I doit être retranché à V ou à X quand I est devant V ou X (ex. : 4 s'écrit IV),
  * X doit être retranché à L ou à C quand X est devant L ou C (ex. : 40 s'écrit XL),
  * C doit être retranché à D ou à M quand C est devant D ou M (ex. : 900 s'écrit CM),
  * Par contre, ôter I de L ou de C n'est pas pratiqué (49 s'écrit XLIX et non IL ; 99 s'écrit XCIX et pas IC) ;
5) Les symboles sont groupés par ordre décroissant, sauf pour les valeurs à retrancher selon la règle précédente (ex. : 1 030 s'écrit MXXX et non XXXM qui est une des façons de représenter 970note 1).


994 s’écrit CMXCIV et se décompose comme suit: 100 soustrait à 1000 (900) + 10 soustrait à 100 (90) + 1 soustrait à 5 (4) = 994.
49 s’écrit XLIX pour 10 soustrait à 50 (40) + 1 soustrait à 10 (9) = 49
308 s’écrit CCCVIII pour 100+100+100 (300) + 5 + 1+1+1 (3) = 308

Exemples: https://fr.wikipedia.org/wiki/Num%C3%A9ration_romaine#Exemples
*/

describe('Romanize service', () => {

  let service: RomanizeService;
  beforeEach(() => {
    service = new RomanizeService();
  });

  it('should understand base numbers', () => {
    expect(service.romanize(1)).toBe('I');
    expect(service.romanize(5)).toBe('V');
    expect(service.romanize(10)).toBe('X');
    expect(service.romanize(50)).toBe('L');
    expect(service.romanize(100)).toBe('C');
    expect(service.romanize(500)).toBe('D');
    expect(service.romanize(1000)).toBe('M');
  });

  it('should understand upper base numbers', () => {
    expect(service.romanize(3)).toBe('III');
    expect(service.romanize(6)).toBe('VI');
    expect(service.romanize(11)).toBe('XI');
    expect(service.romanize(20)).toBe('XX');
    expect(service.romanize(21)).toBe('XXI');
    expect(service.romanize(26)).toBe('XXVI');
    expect(service.romanize(51)).toBe('LI');
    expect(service.romanize(61)).toBe('LXI');
    expect(service.romanize(200)).toBe('CC');
    expect(service.romanize(211)).toBe('CCXI');
    expect(service.romanize(600)).toBe('DC');
    expect(service.romanize(611)).toBe('DCXI');
    expect(service.romanize(2000)).toBe('MM');
    expect(service.romanize(2111)).toBe('MMCXI');
  });

  it('should understand midle base numbers', () => {
    expect(service.romanize(3)).toBe('III');
    expect(service.romanize(8)).toBe('VIII');
    expect(service.romanize(30)).toBe('XXX');
    expect(service.romanize(80)).toBe('LXXX');
    expect(service.romanize(300)).toBe('CCC');
    expect(service.romanize(800)).toBe('DCCC');
    expect(service.romanize(3000)).toBe('MMM');
  });

  it('should understand lower base numbers', () => {
    expect(service.romanize(4)).toBe('IV');
    expect(service.romanize(9)).toBe('IX');
    expect(service.romanize(19)).toBe('XIX');
    expect(service.romanize(44)).toBe('XLIV');
    expect(service.romanize(90)).toBe('XC');
    expect(service.romanize(99)).toBe('XCIX');
    expect(service.romanize(94)).toBe('XCIV');
    expect(service.romanize(400)).toBe('CD');
    expect(service.romanize(699)).toBe('DCXCIX');
    expect(service.romanize(900)).toBe('CM');
    expect(service.romanize(4000)).toBe('MMMM');
  });

  it('should understand some specific examples', () => {
    expect(service.romanize(49)).toBe('XLIX');
    expect(service.romanize(1030)).toBe('MXXX');
    expect(service.romanize(666)).toBe('DCLXVI');
    expect(service.romanize(994)).toBe('CMXCIV');
    expect(service.romanize(308)).toBe('CCCVIII');
  });

});
