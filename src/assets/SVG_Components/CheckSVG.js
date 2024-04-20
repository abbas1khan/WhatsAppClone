import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const CheckSVG = ({ size = 24, color = "#000000" }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 515.556 515.556"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G>
            <Path
                d="m0 274.226 176.549 176.886L515.556 112.44l-48.67-47.997-290.337 290L47.996 225.891z"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(CheckSVG)
