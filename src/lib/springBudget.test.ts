import { describe, expect, it } from 'vitest';
import { calculateBudget, railSaleDate } from './springBudget';

describe('családi utazási keret', () => {
  const route = { days: [{ program: [100, 200] as const, local: [20, 40] as const }], legs: [{ cost: [300, 500] as const }], mealDays: 2, outboundHuf: 147454 * 4, returnHuf: null };
  it('az ismeretlen hazaút mellett részösszeget ad, és nem állít teljes árat', () => {
    const b = calculateBudget(route, 50);
    expect(b.complete).toBe(false);
    expect(b.ground).toEqual([51000, 87000]);
    expect(b.total).toEqual([640816, 676816]);
  });
  it('a program, vasút, transzfer, étkezés és két repülés egyszer szerepel', () => {
    const b = calculateBudget({ ...route, returnHuf: 260506 * 4 }, 60);
    expect(b.complete).toBe(true);
    expect(b.total).toEqual([1693040, 1736240]);
    expect(b.program).toEqual([6000, 12000]);
  });
  it('a 15 napos értékesítési ablakba az utazási nap is beleszámít', () => {
    expect(railSaleDate('2027-03-30')).toBe('2027-03-16');
    expect(railSaleDate('2027-04-05')).toBe('2027-03-22');
  });
});
