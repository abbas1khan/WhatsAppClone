import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const SendIconSVG = ({ size = 24, color = "#ffffff" }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 6.35 6.35"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G transform="matrix(1.18,2.8901664459877536e-16,-2.8901664459877536e-16,1.18,-0.571439062356947,-0.5716654944419868)">
            <Path
                d="M5.691.53a.132.132 0 0 0-.05.008L.617 2.47a.132.132 0 0 0-.021.24l1.67 1c.904-.891 1.968-1.594 1.968-1.594S3.531 3.18 2.64 4.085l1.003 1.672a.132.132 0 0 0 .237-.02L5.812.71a.132.132 0 0 0-.12-.18z"
                paintOrder="stroke fill markers"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(SendIconSVG)