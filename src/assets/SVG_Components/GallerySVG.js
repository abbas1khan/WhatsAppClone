import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const GallerySVG = ({ size = 24, color = "#fff" }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 32 32"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G transform="matrix(-1.2100000000000015,0,0,1.2100000000000015,35.36000000000003,-3.3600000000000243)">
            <Path
                d="M26 5H6a3.003 3.003 0 0 0-3 3v16a3.003 3.003 0 0 0 3 3h20a3.003 3.003 0 0 0 3-3V8a3.003 3.003 0 0 0-3-3zm-15 5a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm13.115 12.75H8.402a1.103 1.103 0 0 1-.847-1.809l3.234-3.88a1.103 1.103 0 0 1 1.627-.074l1.534 1.534a1.103 1.103 0 0 0 1.677-.139l3.693-5.17a1.103 1.103 0 0 1 1.884.148l3.897 7.794a1.103 1.103 0 0 1-.986 1.596z"
                data-name="Layer 10"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(GallerySVG)