import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '@react-native-firebase/database';
import database from "@react-native-firebase/database";

export default function GetTimings(callBack) {
    const shortMonthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await test(user.uid)
        }
    });

    const test = async (id, cb) => {

        await database()
            .ref("profile/" + id)
            .once("value")
            .then((snapshot) => {
                const profile = snapshot.val();
                if (!!profile && profile?.mosques?.length > 0) {
                    database()
                        .ref("/mosqueList")
                        .on("value", (snapshot) => {
                            let data = snapshot.val();
                            for (let key in data) {
                                data[key].hashNumber = key;
                                if (data[key].hashNumber == profile.mosques[0]) {
                                    const defaultMasjid = data[key]
                                    database()
                                        .ref("/prayer_timings")
                                        .on("value", (snapshot) => {
                                            let data = snapshot.val();
                                            for (const property in data) {
                                                if (profile.mosques[0] === property) {
                                                    let result = data[property].substring(
                                                        16,
                                                        data[property].length - 1
                                                    );
                                                    let result3 = JSON.parse(result);
                                                    const day = new Date().getDate();
                                                    const month = new Date().getMonth()
                                                    for (let index = 0; index < result3.length; index++) {
                                                        if (day == result3[index].Day && shortMonthNames[month] == result3[index].Month) {
                                                            callBack({ timings: result3[index], center: defaultMasjid })
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                }
                            }
                        })
                }
            }).catch(err => {
                console.log(err)
            })


    };
    return null
}

const styles = StyleSheet.create({})