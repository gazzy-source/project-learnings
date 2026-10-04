import {describe,it,expect} from 'vitest';
import {littleLaw,mbps,gigabytesPerDay,percentile} from './math';

describe('educational estimation helpers',()=>{
  it('keeps units explicit for Little’s Law and bandwidth',()=>{
    expect(littleLaw(3,10)).toBe(30);
    expect(mbps(60,60)).toBe(8);
    expect(gigabytesPerDay(1024,1)).toBe(1);
  });
  it('calculates a nearest-rank percentile',()=>{
    expect(percentile([1,2,3,4,100],.95)).toBe(100);
  });
});
