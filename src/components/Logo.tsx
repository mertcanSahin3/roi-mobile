import React, { FC } from "react"
import { Image } from "react-native"
import { ResponsiveSize } from "utils/ResponsiveSize";
import { Images } from "resources/Images";
interface Props {
}
const Logo: FC<Props> = (props) => {
    return (
        <Image
            resizeMode="contain"
            style={{
                width: ResponsiveSize(130),
                height: ResponsiveSize(67.8),
            }}
            source={Images.Logo}
        />
    )
}
export default Logo;