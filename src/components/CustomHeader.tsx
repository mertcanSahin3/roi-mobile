import React, { FC } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SCREEN_HEIGHT, SCREEN_WIDTH, responsiveHeight, responsiveWidth } from "constants/Dimension";
import { Icon } from "@ui-kitten/components";
import CustomText from "./CustomText";
import { ResponsiveSize } from "utils/ResponsiveSize";
import AlertDialog from "./AlertDialog";
import CustomButton from "./CustomButton";
import { SCREENS } from "navigation/Navigation";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { logout } from "store/reducers/authReducer";
interface Props {
    goBack?: boolean
    title?: string
    menu?: boolean
}
const CustomHeader: FC<Props> = (props) => {
    const navigation: NavigationProp<any, any> = useNavigation();

    const appDispatch = useAppDispatch();
    const onAlert = () => {
        AlertDialog.show({
            content: <View
                style={{
                    width: ResponsiveSize(200),
                }}
            >
                <CustomButton
                    status="info"
                    onPress={() => {
                        navigation.navigate(SCREENS.HomeScreen)
                        AlertDialog.dismiss();
                    }}
                    accessoryLeft={() =>
                        <Icon name="home-outline" fill="white" style={{
                            height: ResponsiveSize(20),
                            width: ResponsiveSize(20),
                        }} />}
                    style={{ marginVertical: ResponsiveSize(10) }}>Home</CustomButton>

                <CustomButton
                    onPress={onPrint}
                    status="info"
                    accessoryLeft={() =>
                        <Icon name="printer-outline" fill="white" style={{
                            height: ResponsiveSize(20),
                            width: ResponsiveSize(20),
                        }} />}
                    style={{ marginVertical: ResponsiveSize(10) }}>Print</CustomButton>

                <CustomButton
                    onPress={() => {
                        appDispatch(logout())
                        AlertDialog.dismiss();
                    }}
                    status="info"
                    accessoryLeft={() =>
                        <Icon name="log-out-outline" fill="white" style={{
                            height: ResponsiveSize(20),
                            width: ResponsiveSize(20),
                        }} />}
                    style={{ marginVertical: ResponsiveSize(10) }}
                >Logout</CustomButton>
            </View>
            ,
            mode: "CENTER"
        })
    }


    const { contacts } = useAppSelector((state) => state.contacts);
    const onPrint = () => {
        AlertDialog.show({
            content: <View
                style={{
                    width: ResponsiveSize(300),
                }}
            >
                <ScrollView>
                    <CustomText style={{
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "600",
                    }}>Contacts</CustomText>

                    {contacts.map((item, index) => {
                        return (
                            <View key={index}>
                                <CustomText style={{
                                    fontSize: 16,

                                }}
                                >{`${item.name} - ${item.id}`}</CustomText>
                            </View>
                        )
                    })}


                </ScrollView>

            </View>,
            mode: "CENTER"
        })
    };

    return (
        <View>
            {props.menu &&
                <TouchableOpacity
                    onPress={onAlert}
                    style={{
                        zIndex: 2,
                        left: ResponsiveSize(3),
                        position: "absolute",
                    }}
                >
                    <Icon
                        fill="black"
                        style={{
                            height: ResponsiveSize(45),
                            width: ResponsiveSize(45),
                        }}
                        name='menu-outline'
                    />
                </TouchableOpacity>
            }

            {props.goBack &&
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        zIndex: 2,
                        left: ResponsiveSize(3),
                        position: "absolute",
                    }}
                >
                    <Icon
                        fill="black"
                        style={{
                            height: ResponsiveSize(45),
                            width: ResponsiveSize(45),
                        }}
                        name='arrow-ios-back-outline'
                    />
                </TouchableOpacity>
            }
            <View
                style={{
                    height: ResponsiveSize(50),
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CustomText style={{ fontSize: 20 }}>{props.title ? props.title : "Başlık"}</CustomText>
            </View>
        </View>
    )
}
export default CustomHeader;