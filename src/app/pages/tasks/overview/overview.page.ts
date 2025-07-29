import { Component } from '@angular/core';
import { select } from '@ngxs/store';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { principal } from '@state/selectors';
import { Weather } from '../../../components/weather/weather';
import { HlmSeparatorDirective } from '@spartan-ng/helm/separator';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'dy-overview',
  imports: [
    Weather,
    HlmCardImports,
    HlmSeparatorDirective,
    DecimalPipe,
    PercentPipe
  ],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.css'
})
export class OverviewPage {
  readonly principal = select(principal);
  readonly taskStats = [
    { valueType: 'number', label: 'Total tasks', value: 0 },
    { valueType: 'number', label: 'Completed', value: 0 },
    { valueType: 'percentage', label: 'Completion rate', value: 0 },
    { valueType: 'number', label: 'Observed tasks', value: 0 },
  ];
}
