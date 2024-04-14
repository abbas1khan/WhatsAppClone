import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const ForwardSVG = ({ size = 20, color = "#ffffff" }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 48 48"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G transform="matrix(1.1900000000000008,0,0,1.1900000000000008,-4.559526710510262,-4.559730920791637)">
            <Path
                d="m43.63 20.72-15-12A1 1 0 0 0 27 9.5v6A24 24 0 0 0 4.31 36.18L4 38.36a1 1 0 0 0 .61 1.06.84.84 0 0 0 .39.08 1 1 0 0 0 .8-.4l.6-.8A27.12 27.12 0 0 1 27 27.52v6a1 1 0 0 0 1.63.78l15-12a1 1 0 0 0 0-1.56z"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(ForwardSVG)