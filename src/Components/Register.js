import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" };
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require("../../assets/thumbnail_logo_snap.png")}
                    />
                </View>
                <View style={styles.content}>
                    <Text style={{ color: "red" }}>{this.state.error}</Text>
                    <Text style={styles.text}>Creation de compte</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        placeholder='Email'
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        placeholder='Password'
                    />
                    <Button title='Register' onPress={this.register} />
                </View>
            </View>
        );
    }

    register = async () => {
        fetch("https://snapi-wac.herokuapp.com/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.username,
                password: this.state.password,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 400) {
                    this.setState({ error: responseJson.message });
                } else {
                    alert("Registration success !");
                    const navigateAction = NavigationActions.navigate({
                        routeName: "Login",
                    });
                    this.props.navigation.dispatch(navigateAction);
                }
            });
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: "100%",
        backgroundColor: "#FFFF00",
        flex: 1,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        paddingLeft: 15,
    },
    content: {
        marginTop: "20%",
        backgroundColor: "#FFFF00",
    },
    logo: {
        height: 175,
        width: 175,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: "20%",
    },
    text: {
        height: 45,
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
    },
});
