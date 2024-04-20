import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import { colors } from "../../utils/Theme";

const ScrollDownSVG = ({ size = 24, color = colors.cameraChatSpecific }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 512 512"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G>
            <Path
                d="M1 247.8c3-13.8 11.2-23.1 25.2-27 15.3-4.3 28 .4 38.8 11.3 41.9 42 83.7 84.1 125.6 126.2 21 21 42.2 41.9 65.4 65l191.4-191.4c16-16 38.8-16.9 53.6-2.9 14.8 14.1 15 38-.6 53.7-72.3 72.6-144.7 145.1-217.3 217.3-15.8 15.7-37.9 16.1-53.6.6-73-72.5-145.7-145.2-218.2-218.1C1.8 272.9-2 261.1 1 247.8z"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
            <Path
                d="M1 28.6c3-13.8 11.2-23.1 25.2-27 15.3-4.2 27.9.5 38.7 11.4 41.9 42 83.7 84.1 125.6 126.2 21 21 42.2 41.9 65.4 65L447.3 12.7c16-16 38.8-16.9 53.6-2.9 14.8 14.1 15 38-.6 53.7-72.2 72.6-144.7 145.1-217.3 217.3-15.8 15.7-37.9 16.1-53.6.6C156.6 209 83.8 136.3 11.3 63.3 1.8 53.8-2 42 1 28.6z"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(ScrollDownSVG)