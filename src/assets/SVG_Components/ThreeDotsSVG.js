import * as React from "react";
import Svg, { G, Circle } from "react-native-svg";

const ThreeDotsSVG = ({ size = 24, color = "#ffffff" }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 24 24"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G transform="matrix(1.0999999999999994,0,0,1.0999999999999994,-1.1999999999999922,-1.200000023841847)">
            <G data-name="Layer 2">
                <Circle
                    cx={12}
                    cy={12}
                    r={2.972}
                    fill={color}
                    opacity={1}
                    data-original={color}
                    className=""
                />
                <Circle
                    cx={12}
                    cy={4.222}
                    r={2.972}
                    fill={color}
                    opacity={1}
                    data-original={color}
                    className=""
                />
                <Circle
                    cx={12}
                    cy={19.778}
                    r={2.972}
                    fill={color}
                    opacity={1}
                    data-original={color}
                    className=""
                />
            </G>
        </G>
    </Svg>
);
export default React.memo(ThreeDotsSVG)