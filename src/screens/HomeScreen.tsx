import { NavigationProp } from "@react-navigation/native";
import AlertDialog from "components/AlertDialog";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import CustomText from "components/CustomText";
import Logo from "components/Logo";
import UserAddImage from "components/UserAddImage";
import { SCREEN_WIDTH } from "constants/Dimension";
import { SCREENS } from "navigation/Navigation";
import React, { FC, useState } from "react"
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { IContact, deleteContact } from "store/reducers/contactsReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    navigation: NavigationProp<any, any>,
}
const HomeScreen: FC<Props> = (props) => {
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const { contacts } = useAppSelector((state) => state.contacts);

    const appDispatch = useAppDispatch();

    const onPress = (selected: IContact) => {
        AlertDialog.show({
            content: <View
                style={{
                    width: ResponsiveSize(300),
                }}
            >
                <CustomText style={{ marginTop: ResponsiveSize(10), textAlign: "center", fontSize: 18 }} >{`Employee ID:${selected.id}`}</CustomText>
                <CustomText style={{ marginTop: ResponsiveSize(10), textAlign: "center", fontSize: 18 }} >{`Name :${selected.name}`}</CustomText>
                <CustomButton
                    onPress={() => {
                        props.navigation.navigate(SCREENS.ContactDetailsScreen, { contactId: selected.id })
                        AlertDialog.dismiss();
                    }}
                    status="info"
                    style={{ marginTop: ResponsiveSize(10) }}
                >View Details</CustomButton>
                <CustomButton
                    onPress={() => {
                        props.navigation.navigate(SCREENS.EditContactScreen, { contactId: selected.id })
                        AlertDialog.dismiss();
                    }}
                    status="info"
                    style={{ marginTop: ResponsiveSize(10) }}
                >Edit</CustomButton>
                <CustomButton
                    onPress={() => onDeleteConfirm(selected)}
                    status="info"
                    style={{ marginTop: ResponsiveSize(10) }}
                >Delete Contact</CustomButton>
            </View>,
            mode: "CENTER",
        })
    };

    const onDeleteConfirm = (selected: IContact) => {
        AlertDialog.show({
            content: <View
                style={{
                    width: ResponsiveSize(300),
                }}
            >
                <CustomText style={{
                    marginTop: ResponsiveSize(10),
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "700",
                }} >Confirmation</CustomText>
                <CustomText style={{
                    marginHorizontal: ResponsiveSize(30),
                    marginTop: ResponsiveSize(20),
                    textAlign: "center",
                    fontSize: 18
                }} >Are you sure want to delete this record ?</CustomText>
                <View style={{
                    marginTop: ResponsiveSize(20),
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginBottom: ResponsiveSize(10),
                }}>
                    <CustomButton
                        onPress={() => AlertDialog.dismiss()}
                        status="info"
                    >Cancel</CustomButton>
                    <CustomButton
                        onPress={() => {
                            appDispatch(deleteContact({ id: selected.id }));
                            AlertDialog.dismiss();
                        }}
                        status="danger"
                    >Delete</CustomButton>
                </View>
            </View>,
            mode: "CENTER",
        })
    };

    const [search, setSearch] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader menu title="Contacts" />
            <View
                style={{
                    flex: 5,
                    flexDirection: isVertical ? "column" : "row",
                    alignItems: isVertical ? "center" : undefined,
                }}
            >
                <View style={{
                    flex: isVertical ? 4 : 2,
                    alignItems: "center",
                    width: SCREEN_WIDTH,
                }}>
                    <CustomInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search Contacts"
                        style={{
                            width: ResponsiveSize(290),
                            marginTop: ResponsiveSize(20),
                        }}
                    />
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: SCREEN_WIDTH }}
                        contentContainerStyle={{
                            paddingVertical: ResponsiveSize(20),
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                            }}
                        >
                            {contacts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPress(item);
                                        }}
                                        key={index}
                                        style={{
                                            width: ResponsiveSize(300),
                                            backgroundColor: "white",
                                            height: ResponsiveSize(50),
                                            borderRadius: 10,
                                            borderBottomWidth: 1,
                                            borderBottomColor: "lightgrey",
                                            marginVertical: ResponsiveSize(5),
                                            justifyContent: "center"
                                        }}
                                    >
                                        <CustomText style={{
                                            fontSize: 22,
                                            paddingHorizontal: ResponsiveSize(10),
                                            fontWeight: "600",
                                        }}>{item.name}</CustomText>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </ScrollView>
                </View>


                {isVertical ?
                    <View
                        style={{
                            flex: 1,
                            width: ResponsiveSize(300),
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            backgroundColor: "transparent",
                        }}
                    >

                        <Logo />
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(SCREENS.AddContactScreen)}
                            style={{
                                marginBottom: ResponsiveSize(20),
                            }}>
                            <UserAddImage />
                        </TouchableOpacity>
                    </View>
                    :
                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            marginHorizontal: ResponsiveSize(20),
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(SCREENS.AddContactScreen)}
                            style={{
                                marginBottom: ResponsiveSize(20),
                            }}>
                            <UserAddImage />
                        </TouchableOpacity>
                        <Logo />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen;