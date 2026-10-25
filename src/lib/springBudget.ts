export type Range = readonly [number, number];
type BudgetRoute = { days: { program: Range; local: Range }[]; legs: { cost: Range }[]; mealDays: number; outboundHuf: number; returnHuf: number | null };
const sum = (ranges: Range[]): Range => ranges.reduce<Range>((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
export function calculateBudget(route: BudgetRoute, exchange: number) {
  const convert = (range: Range): Range => [Math.round(range[0] * exchange), Math.round(range[1] * exchange)];
  const program = convert(sum(route.days.map(d => d.program)));
  const local = convert(sum(route.days.map(d => d.local)));
  const rail = convert(sum(route.legs.map(l => l.cost)));
  const meals = convert([route.mealDays * 300, route.mealDays * 500]);
  const ground = sum([program, local, rail, meals]);
  const flights = route.outboundHuf + (route.returnHuf ?? 0);
  return { program, local, rail, meals, ground, total: [ground[0] + flights, ground[1] + flights] as Range, complete: route.returnHuf !== null };
}
export function railSaleDate(date: string) {
  const day = new Date(`${date}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() - 14);
  return day.toISOString().slice(0, 10);
}
