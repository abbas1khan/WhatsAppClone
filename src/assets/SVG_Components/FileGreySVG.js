import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const FileGreySVG = ({ size = 26 }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={size}
        height={size}
        x={0}
        y={0}
        viewBox="0 0 64 64"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        className=""
    >
        <G>
            <Path
                fill="#798f9a"
                d="M55.994 13.887c-.018-.151-.196-1.502-1.115-2.422L44.536 1.122C43.617.203 42.265.024 42.114.007A.872.872 0 0 0 42 0H13c-2.757 0-5 2.243-5 5v54c0 2.757 2.243 5 5 5h38c2.757 0 5-2.243 5-5V14c0-.038-.002-.076-.006-.113z"
                opacity={1}
                data-original="#ffdaaa"
                className=""
            />
            <Path
                fill="#a1b2b9"
                d="M54.879 11.465 44.536 1.122C43.617.203 42.265.024 42.114.007a.987.987 0 0 0-.779.248A.996.996 0 0 0 41 1v9c0 2.757 2.243 5 5 5h9a1 1 0 0 0 .994-1.114c-.018-.151-.196-1.502-1.115-2.421z"
                opacity={1}
                data-original="#ffb655"
                className=""
            />
        </G>
    </Svg>
);
export default React.memo(FileGreySVG)