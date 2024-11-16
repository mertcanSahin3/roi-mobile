import { NavigationProp } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";
import Logo from "components/Logo";
import UserImage from "components/UserImage";
import { Departments, } from "constants/Constants";
import React, { FC, useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { IContact, IDepartment, addContact } from "store/reducers/contactsReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    navigation: NavigationProp<any, any>,
}
const AddContactScreen: FC<Props> = (props) => {
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const appDispatch = useAppDispatch();
    const { nextId } = useAppSelector((state) => state.contacts);
    // name , phone number, address , city , state , zip code , country için use state yap

    const [department, setDepartment] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

    const onCreate = () => {
        if (department.trim() == "") {
            Alert.alert("Error", "Please select department");
        }
        else if (name.trim() == "") {
            Alert.alert("Error", "Please enter name");
        }
        else if (phoneNumber.trim() == "") {
            Alert.alert("Error", "Please enter phone number");
        }
        else if (address.trim() == "") {
            Alert.alert("Error", "Please enter address");
        }
        else if (city.trim() == "") {
            Alert.alert("Error", "Please enter city");
        }
        else if (state.trim() == "") {
            Alert.alert("Error", "Please enter state");
        }
        else if (zipCode.trim() == "") {
            Alert.alert("Error", "Please enter zip code");
        }
        else if (country.trim() == "") {
            Alert.alert("Error", "Please enter country");
        }
        else {
            Alert.alert("Success", "Contact created successfully");
            const contact: IContact = {
                id: nextId,
                department: department as IDepartment,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country,
            }
            appDispatch(addContact({ concact: contact }))
            props.navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <CustomHeader title="Add Contact" menu />
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

                        <CustomSelect
                            modalTitle="Select Department"
                            title="Select Department"
                            placeHolder="Select Department"
                            value={department}
                            onSelect={setDepartment}
                            data={Departments}

                            inputStyle={{
                                width: ResponsiveSize(290),

                            }}

                        />

                        <CustomInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }}
                            title="Name"
                        />
                        <CustomInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Phone Number"
                            title="Phone Number"
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }}
                        />

                        <CustomInput
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Address"
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }}
                            title="Address"
                        />

                        <CustomInput
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }} title="City"
                        />

                        <CustomInput
                            value={state}
                            onChangeText={setState}
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }} placeholder="State"
                            title="State"
                        />

                        <CustomInput
                            value={zipCode}
                            onChangeText={setZipCode}
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }} placeholder="Zip Code"
                            title="Zip Code"
                        />
                        <CustomInput
                            value={country}
                            onChangeText={setCountry}
                            viewStyle={{
                                width: ResponsiveSize(290),
                                marginTop: ResponsiveSize(20)
                            }} placeholder="Country"
                            title="Country"
                        />
                    </ScrollView>

                </View>

                <View
                    style={{
                        marginTop: ResponsiveSize(20),
                        flex: isVertical ? 1 : 1,
                        flexDirection: isVertical ? "row" : "column",
                        justifyContent: isVertical ? "space-between" : "space-around",
                        alignItems: "center",
                    }}
                >
                    <CustomButton
                        onPress={onCreate}
                        status="danger"
                        style={{
                            width: ResponsiveSize(150),
                        }}>Add Contact</CustomButton>
                    <CustomButton
                        onPress={() => props.navigation.goBack()}
                        status="info"
                        style={{
                            width: ResponsiveSize(150),
                        }}>Cancel</CustomButton>

                </View>
            </View>

        </SafeAreaView>
    )
}
export default AddContactScreen;