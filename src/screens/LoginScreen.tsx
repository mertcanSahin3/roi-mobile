import React, { FC, useState } from "react"
import { Alert, Image, ScrollView, Touchable, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "components/CustomInput";
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomButton from "components/CustomButton";
import { ResponsiveSize } from "utils/ResponsiveSize";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { NavigationProp } from "@react-navigation/native";
import { SCREENS } from "navigation/Navigation";
import { login } from "store/reducers/authReducer";
import Logo from "components/Logo";
import { Images } from "resources/Images";
import CustomText from "components/CustomText";
interface Props {
    navigation: NavigationProp<any, any>,
}
const LoginScreen: FC<Props> = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const store = useAppSelector((state) => state.auth);
    const appDispatch = useAppDispatch();
    const onLogin = () => {
        if (username == store.username && password == store.password) {
            appDispatch(login());
        }
        else {
            Alert.alert("Error", "Username or Password is incorrect");
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    flex: 1,
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert("FAQ", "You can check the technical documention.")
                    }}
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        top: ResponsiveSize(10),
                        right: ResponsiveSize(20),
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <CustomText
                        style={{
                            fontSize: 16,
                            marginRight: ResponsiveSize(5),
                        }}
                    >FAQ?</CustomText>
                    <Image
                        source={Images.Faq}
                        resizeMode="contain"
                        style={{
                            height: ResponsiveSize(40),
                            width: ResponsiveSize(50),
                        }}
                    />
                </TouchableOpacity>
                <ScrollView
                    contentContainerStyle={{
                        paddingTop: isVertical ? responsiveHeight(150) : ResponsiveSize(50),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Logo />
                    <CustomInput
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        personIcon
                        viewStyle={{
                            marginTop: responsiveHeight(20),
                            width: ResponsiveSize(300),
                        }}
                    />
                    <CustomInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        type="password"
                        viewStyle={{
                            marginTop: responsiveHeight(20),
                            width: ResponsiveSize(300),
                        }}
                    />
                    <View
                        style={{
                            marginTop: isVertical ? responsiveHeight(0) : responsiveHeight(20),
                            flexDirection: isVertical ? "column" : "row",
                            justifyContent: "space-between",
                            width: responsiveWidth(300),
                        }}
                    >
                        <CustomButton
                            status="info"
                            onPress={onLogin}
                            style={{
                                marginTop: responsiveHeight(20),
                                width: isVertical ? ResponsiveSize(300) : ResponsiveSize(250),
                            }}
                        >LOGIN</CustomButton>
                        <CustomButton
                            status="info"
                            onPress={() => props.navigation.navigate(SCREENS.ResetPasswordScreen)}
                            style={{
                                marginTop: responsiveHeight(20),
                                width: isVertical ? ResponsiveSize(300) : ResponsiveSize(250),
                            }}
                        >RESET PASSWORD</CustomButton>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen;