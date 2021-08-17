import React, { useState, useRef, useEffect } from 'react';

interface AutoResizeTextProps {
  /** The maximum dimension of the text. */
  size: number;
  /** CSS properties to pass to the SVG text element. */
  style: React.CSSProperties;
}

/**
 * A Text component that resizes its content to fit the given size.
 */
export const AutoResizeText: React.FC<AutoResizeTextProps> = ({ size, style, children }) => {
  const text = useRef<SVGTextElement>(null);
  const [textSize, setTextSize] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (text.current) {
      var bb = text.current.getBBox();
      var widthTransform = size / bb.width;
      var heightTransform = size / bb.height;
      setTextSize({ width: widthTransform, height: heightTransform });
    }
  }, [text.current, size, children]);

  return (
    <text
      ref={text}
      transform={`scale(${Math.min(textSize.width, textSize.height)})`}
      dy={`0.4rem`}
      style={{
        textAnchor: 'middle',
        ...style,
      }}
    >
      {children}
    </text>
  );
};
