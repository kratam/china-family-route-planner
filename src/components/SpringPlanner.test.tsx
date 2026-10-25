import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SpringPlanner } from './SpringPlanner';

describe('tavaszi útvonalválasztás', () => {
  it('váltás után az új napi terv látszik, a másik nem olvastatható fel', () => {
    render(<SpringPlanner />);
    expect(screen.getByRole('heading', {name:'A császároktól a neonvárosig'})).toBeVisible();
    expect(screen.queryByRole('heading', {name:'A Nagy Faltól a déli karsztokig'})).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name:/Déli út.*Guilin/}));
    expect(screen.getByRole('heading', {name:'A Nagy Faltól a déli karsztokig'})).toBeVisible();
    expect(screen.queryByRole('heading', {name:'A császároktól a neonvárosig'})).not.toBeInTheDocument();
  });
  it('az árfolyam a helyi költségeket változtatja, a forintos repülőreferenciát nem', () => {
    render(<SpringPlanner />);
    const south = screen.getByTestId('budget-south');
    expect(within(south).getByText('1 631 840 Ft', {exact:true})).toBeInTheDocument();
    const before = within(south).getByTestId('ground-cost').textContent;
    fireEvent.change(screen.getByRole('combobox', {name:/Tervezési árfolyam/}), {target:{value:'60'}});
    expect(within(south).getByTestId('ground-cost').textContent).not.toBe(before);
    expect(within(south).getByText('1 631 840 Ft', {exact:true})).toBeInTheDocument();
  });
});
