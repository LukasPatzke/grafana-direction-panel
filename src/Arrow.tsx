import React, { useState, useEffect } from 'react';

interface ArrowProps {
  /** The radius of the circle the arrow is displayed on. */
  radius: number;
  /** The current rotation in degrees from 0 to 360. */
  rotation: number;
  /** Display the arrow inwards the circle
   * @default false
   */
  inwards?: boolean;
  /** CSS properties to pass to the SVG path element. */
  style?: React.CSSProperties;
}

export const Arrow: React.FC<ArrowProps> = props => {
  const [rotation, setRotation] = useState(0);
  const { radius, inwards = false } = props;
  const length = radius / 3;

  useEffect(() => {
    // calculate the rotation to move the shortest distance on the circle
    // https://stackoverflow.com/a/19872672
    // this is important if we animate the transition with CSS...
    let newRotation = rotation; // what the current rotation is, counter
    let apparentRot = rotation % 360; // what the current rotation appears to be

    // reset the counter to a positive value
    if (apparentRot < 0) {
      apparentRot += 360;
    }

    if (apparentRot < 180 && props.rotation > apparentRot + 180) {
      // rotate back
      newRotation -= 360;
    }
    if (apparentRot >= 180 && props.rotation <= apparentRot - 180) {
      // rotate forward
      newRotation += 360;
    }
    newRotation += props.rotation - apparentRot;
    setRotation(newRotation);
  }, [props.rotation]);

  return (
    <path
      style={props.style}
      d={
        inwards
          ? `M${-length / 2},${(-radius * 9) / 10} a${radius},${radius} 0 0,1 ${length},0 l${-length / 2},${(radius *
              9) /
              10} z`
          : `M${-length / 2},${-radius - length / 2} a${radius},${radius} 0 0,1 ${length},0 l${-length / 2},${length} z`
      }
      transform={`rotate(${rotation}, 0, 0)`}
    />
  );
};
