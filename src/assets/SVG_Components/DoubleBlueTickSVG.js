import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const DoubleBlueTickSVG = ({ size = 20, color = "dodgerblue" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    x={0}
    y={0}
    viewBox="0 0 460.702 460.702"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    className=""
  >
    <G>
      <Path
        d="M316.608 121.805c-8.937-9.037-23.499-9.151-32.576-.254L113.764 289.833l-74.017-76.626c-8.828-9.201-23.443-9.503-32.643-.675-9.201 8.828-9.503 23.443-.675 32.643l.119.123 90.248 93.526a23.086 23.086 0 0 0 16.392 6.926h.254a23.085 23.085 0 0 0 16.161-6.672L316.4 154.381c9.025-8.95 9.117-23.511.208-32.576zM235.318 338.824a23.088 23.088 0 0 0 16.346 6.926h.254a23.085 23.085 0 0 0 16.161-6.672l186.798-184.697c8.467-9.534 7.602-24.126-1.931-32.593-8.643-7.676-21.63-7.777-30.391-.237L252.356 289.833l-6.072-6.303c-8.827-9.201-23.442-9.504-32.643-.676-9.201 8.827-9.504 23.442-.676 32.643l.12.124z"
        fill={color}
        opacity={1}
        data-original={color}
      />
    </G>
  </Svg>
);
export default React.memo(DoubleBlueTickSVG)