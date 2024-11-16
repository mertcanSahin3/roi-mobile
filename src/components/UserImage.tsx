import React, { FC } from "react"
import { Image } from "react-native"
import { Images } from "resources/Images";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
}
const UserImage: FC<Props> = (props) => {
    return (
        <Image
            tintColor="#595959"
            source={Images.User}
            style={{
                height: ResponsiveSize(75),
                width: ResponsiveSize(75),
            }}
        />
    )
}
export default UserImage;