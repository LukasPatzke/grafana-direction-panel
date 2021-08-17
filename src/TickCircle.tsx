import React from 'react';

interface TickCircleProps {
  /** The radius of the circle. */
  radius: number;
  /** The number of ticks displayed. */
  tickCount: number;
  /** The lenght of the ticks  */
  tickLength: number;
  /** The spaces between ticks relative to the tick width. */
  tickWidth: number;
  /** CSS properties to pass to the SVG circle element. */
  style?: React.CSSProperties;
}

export const TickCircle: React.FC<TickCircleProps> = props => {
  const { radius, tickCount, tickLength, tickWidth } = props;
  const cirumference = 2 * Math.PI * radius;
  const tickSpacing = cirumference / tickCount - tickWidth;
  return (
    <circle
      style={{
        strokeWidth: tickLength,
        strokeDasharray: `${tickWidth}, ${tickSpacing}`,
        strokeDashoffset: tickWidth / 2,
        // strokeDasharray: `${cirumference / 300}, ${cirumference / 100}`,
        ...props.style,
      }}
      r={radius}
    />
  );
};
