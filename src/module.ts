import { PanelPlugin } from '@grafana/data';
import { DirectionOptions } from './types';
import { DirectionPanel } from './DirectionPanel';
import { FieldSelector } from 'FieldSelector';

export const plugin = new PanelPlugin<DirectionOptions>(DirectionPanel).useFieldConfig().setPanelOptions(builder => {
  return builder
    .addCustomEditor({
      id: 'directionField',
      path: 'directionField',
      name: 'Direction Field',
      description: 'Select the field that should be displayed as a direction',
      editor: FieldSelector,
    })
    .addBooleanSwitch({
      path: 'showValue',
      name: 'Show value',
      defaultValue: true,
    })
    .addCustomEditor({
      id: 'valueField',
      path: 'valueField',
      name: 'Value Field',
      description: 'Select the field that should be displayed as a value',
      editor: FieldSelector,
      showIf: config => config.showValue,
    })
    .addNumberInput({
      path: 'transitionDuration',
      name: 'Transition Duration',
      description: 'In Seconds, set to 0 to disable transition animations.',
      defaultValue: 0.5,
    })
    .addNumberInput({
      path: 'maxValue',
      name: 'Maximum Value',
      description: 'Set to the value of a complete rotation.',
      defaultValue: 360,
    })
    .addNumberInput({
      path: 'tickCount',
      name: 'Number of ticks',
      defaultValue: 2 ** 7,
    })
    .addNumberInput({
      path: 'tickLength',
      name: 'Lenght of the ticks',
      defaultValue: 10,
    })
    .addNumberInput({
      path: 'tickWidth',
      name: 'Width of the ticks',
      defaultValue: 1,
    });
});
