import React from 'react';
import { FieldType, PanelProps } from '@grafana/data';
import { DirectionOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { Arrow } from 'Arrow';
import { AutoResizeText } from 'AutoResizeText';
import { TickCircle } from 'TickCircle';

interface Props extends PanelProps<DirectionOptions> {}

export const DirectionPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();
  const styles = getStyles();

  const radius = (Math.min(width, height) * 0.8) / 2;

  const directionSeries = data.series.find(series => series.refId === options.directionField);
  const directionField = directionSeries
    ? directionSeries.fields.find(field => field.type === FieldType.number)
    : undefined;
  const direction = directionField?.values.get(directionField.values.length - 1);
  const displayDirection = directionField?.display ? directionField?.display(direction) : undefined;

  const valueSeries = data.series.find(series => series.refId === options.valueField);
  const valueField = valueSeries ? valueSeries.fields.find(field => field.type === FieldType.number) : undefined;
  const value = valueField?.values.get(valueField.values.length - 1);
  const displayValue = valueField?.display ? valueField?.display(value) : undefined;

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      >
        <g>
          <TickCircle
            radius={radius}
            tickCount={options.tickCount}
            tickLength={(radius / 100) * options.tickLength}
            tickWidth={(radius / 100) * options.tickWidth}
            style={{
              fill: 'transparent',
              stroke: theme.colors.text,
            }}
          />
          <Arrow
            radius={radius}
            rotation={((direction % options.maxValue) / options.maxValue) * 360}
            inwards={!options.showValue}
            style={{
              fill: displayDirection?.color || theme.colors.text,
              transition: `all ${options.transitionDuration}s`,
            }}
          />
          {options.showValue && (
            <AutoResizeText
              size={radius * 1.5}
              style={{
                fill: displayValue?.color || theme.colors.text,
              }}
            >
              {displayValue?.text || 'No Data'}
              <tspan fontSize={'0.6em'}>{displayValue?.suffix}</tspan>
            </AutoResizeText>
          )}
        </g>
      </svg>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
  };
});
