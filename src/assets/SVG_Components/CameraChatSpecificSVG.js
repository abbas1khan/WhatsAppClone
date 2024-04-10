import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
const CameraChatSpecificSVG = ({ size = 20, color = "#ffffff" }) => (
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
        <G transform="matrix(0.99,0,0,0.99,0.16000000000000014,0.16000000000000014)">
            <Path
                fillRule="evenodd"
                d="M20.8 2c1.3 0 2.4.8 2.8 2.1l.7 1.9H26c3.3 0 6 2.7 6 6v12c0 3.3-2.7 6-6 6H6c-3.3 0-6-2.7-6-6V12c0-3.3 2.7-6 6-6h1.7l.7-1.9C8.7 2.8 9.9 2 11.2 2zM16 10c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"
                clipRule="evenodd"
                fill={color}
                opacity={1}
                data-original={color}
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(CameraChatSpecificSVG)



// import * as React from "react";
// import Svg, { G, Path, Circle } from "react-native-svg";

// const CameraChatSpecificSVG = ({ size = 20, color = "#ffffff" }) => (
//     <Svg
//         xmlns="http://www.w3.org/2000/svg"
//         xmlnsXlink="http://www.w3.org/1999/xlink"
//         width={size}
//         height={size}
//         x={0}
//         y={0}
//         viewBox="0 0 24 24"
//         style={{
//             enableBackground: "new 0 0 512 512",
//         }}
//         xmlSpace="preserve"
//         className=""
//     >
//         <G transform="matrix(1.0999999999999994,0,0,1.0999999999999994,-1.2000000953674252,-1.1999985218048028)">
//             <G data-name="Layer 2">
//                 <Path
//                     d="M20 6.25h-.76a1.23 1.23 0 0 1-1.12-.69l-.9-1.79a2.73 2.73 0 0 0-2.46-1.52H9.24a2.73 2.73 0 0 0-2.46 1.52l-.9 1.79a1.23 1.23 0 0 1-1.12.69H4A2.75 2.75 0 0 0 1.25 9v10A2.75 2.75 0 0 0 4 21.75h16A2.75 2.75 0 0 0 22.75 19V9A2.75 2.75 0 0 0 20 6.25zm-8 12A5.25 5.25 0 1 1 17.25 13 5.26 5.26 0 0 1 12 18.25z"
//                     fill={color}
//                     opacity={1}
//                     data-original={color}
//                     className=""
//                 />
//                 <Circle
//                     cx={12}
//                     cy={13}
//                     r={3.75}
//                     fill={color}
//                     opacity={1}
//                     data-original={color}
//                     className=""
//                 />
//             </G>
//         </G>
//     </Svg>
// );
// export default React.memo(CameraChatSpecificSVG)