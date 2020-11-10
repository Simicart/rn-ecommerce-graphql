import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgChevronForwardOutline(props) {
  return (
    <Svg
      className="chevron-forward-outline_svg__ionicon"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M184 112l144 144-144 144"
      />
    </Svg>
  );
}

export {SvgChevronForwardOutline};

