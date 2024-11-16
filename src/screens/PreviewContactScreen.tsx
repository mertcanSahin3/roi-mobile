import { NavigationProp, RouteProp } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";
import CustomText from "components/CustomText";
import Logo from "components/Logo";
import UserImage from "components/UserImage";
import { Departments, } from "constants/Constants";
import React, { FC, useState } from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "store/Hooks";
import { ResponsiveSize } from "utils/ResponsiveSize";
type RootStackParamList = {
    ContactDetailsScreen: {
        contactId: number
    };
};
interface Props {
    navigation: NavigationProp<any, any>,
    route: RouteProp<RootStackParamList, 'ContactDetailsScreen'>;
}
const ContactDetailsScreen: FC<any> = (props: Props) => {
    const contactId = props.route.params.contactId;
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const { contacts } = useAppSelector((state) => state.contacts);
    const findedContact = contacts.find((item) => item.id == contactId);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Contact Details" menu />
            <View
                style={{
                    flex: isVertical ? 1 : 1,
                    marginTop: ResponsiveSize(20),
                    marginHorizontal: ResponsiveSize(20),
                    flexDirection: isVertical ? "column" : "row",
                }}
            >
                <View
                    style={{
                        flex: isVertical ? 2 : 1,
                    }}
                >
                    <View
                        style={{
                            flex: isVertical ? 2 : 1,
                            alignItems: "center",
                            justifyContent: isVertical ? "space-between" : "space-evenly",
                            flexDirection: isVertical ? "row" : "column",
                        }}
                    >
                        <UserImage />
                        <Logo />
                    </View>
                </View>
                <View
                    style={{
                        flex: isVertical ? 7 : 2,
                        marginHorizontal: ResponsiveSize(20),
                    }}
                >
                    <ScrollView
                        style={{
                            flex: isVertical ? 7 : 5,
                        }}
                        contentContainerStyle={{
                            paddingVertical: ResponsiveSize(20),
                            alignItems: "center",
                        }}
                        showsVerticalScrollIndicator={false}
                    >

                        <CustomText style={{
                            width: ResponsiveSize(290),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Department : </CustomText>{findedContact?.department}</CustomText>

                        <CustomText style={{
                            marginTop: ResponsiveSize(20),
                            width: ResponsiveSize(290),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Name : </CustomText>{findedContact?.name}</CustomText>

                        <CustomText style={{
                            marginTop: ResponsiveSize(20),
                            width: ResponsiveSize(290),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Phone Number : </CustomText>{findedContact?.phoneNumber}</CustomText>

                        <CustomText style={{
                            marginTop: ResponsiveSize(20),
                            width: ResponsiveSize(290),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Address : </CustomText>{findedContact?.address}</CustomText>

                        <CustomText style={{
                            width: ResponsiveSize(290),
                            marginTop: ResponsiveSize(20),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>City : </CustomText>{findedContact?.city}</CustomText>

                        <CustomText style={{
                            width: ResponsiveSize(290),
                            marginTop: ResponsiveSize(20),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>State : </CustomText>{findedContact?.state}</CustomText>

                        <CustomText style={{
                            width: ResponsiveSize(290),
                            marginTop: ResponsiveSize(20),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Zip Code : </CustomText>{findedContact?.zipCode}</CustomText>

                        <CustomText style={{
                            marginTop: ResponsiveSize(20),
                            width: ResponsiveSize(290),
                            fontSize: 18,
                        }}><CustomText style={{ fontWeight: "600" }}>Country : </CustomText>{findedContact?.country}</CustomText>

                    </ScrollView>
                </View>
                <View
                    style={{
                        marginTop: ResponsiveSize(20),
                        flex: 1,
                        flexDirection: isVertical ? "row" : "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomButton
                        onPress={() => props.navigation.goBack()}
                        status="info"
                        style={{
                            width: isVertical ? ResponsiveSize(250) : ResponsiveSize(150),
                        }}>Go Back</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default ContactDetailsScreen;