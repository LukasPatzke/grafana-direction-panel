import React from 'react';
import { SelectableValue, StandardEditorProps } from '@grafana/data';
import { Select } from '@grafana/ui';

export const FieldSelector: React.FC<StandardEditorProps<string>> = ({ value, onChange, context }) => {
  const options: Array<SelectableValue<string>> = [];

  if (context.data) {
    const frames = context.data;

    for (const frame of frames) {
      options.push({
        label: frame.name || frame.refId,
        value: frame.refId,
      });
    }
  }

  if (options.length > 0 && value === undefined) {
    // Load default
    onChange(options[0].value);
  }

  return <Select options={options} value={value} onChange={selectableValue => onChange(selectableValue.value)} />;
};
