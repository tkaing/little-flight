import axios from "axios";
import Share from 'react-native-share';
import TelloClass from "./../App/class/TelloClass"

import * as SecureStore from "expo-secure-store";

import * as api_node_js from "../Api/Nodejs";
import * as app_service from "../App/Service";
import * as api_secure_store from "../Api/SecureStore";

import { load, ffmpeg, redirect_to } from ".";
import { PermissionsAndroid } from "react-native";
import * as RNFS from "react-native-fs";
import MediaFolderConst from "../App/const/MediaFolderConst";
import { RNFFmpeg } from "react-native-ffmpeg";
import LiveConst from "../App/const/LiveConst";

const on = {
    fpv: {
        openReport: async ( { toast }, {
            subject,
            createdAt,
            description,
        }) => {
            try {
                const _response = await axios.post(
                    api_node_js.ReportCall.open(), {
                        subject: subject,
                        createdAt: createdAt,
                        description: description,
                    }, await api_node_js.Config()
                );

                const _data = _response.data;

                console.log('=== SEND BUG REPORT ===', JSON.stringify(_data));

                app_service.toast(toast, 'success', `Okay, thank you we will look at this issue !`);


            } catch (failure) {
                console.log('=== SEND BUG REPORT ===', failure);
                app_service.toast(toast, 'danger', `Ooops, an eror has been declared !`);
            }
        },
        recordingTap: async ({ toast }, {
            liveExecId,
            setNewFrame,
            setLiveExecId,
            recordingExecId,
            setRecordingExecId,
            setLoadingRecordingBtn,
        }) => {
            if (!recordingExecId) {
                setLoadingRecordingBtn(true);
                if (liveExecId) {
                    RNFFmpeg.cancelExecution(liveExecId);
                    setLiveExecId(null);
                }
                RNFFmpeg.cancel();
                setTimeout(async function () {
                    await ffmpeg.launchRecording(
                        { toast }, { setRecordingExecId }
                    );
                    setLoadingRecordingBtn(false);
                }, 1000);
            } else {
                RNFFmpeg.cancelExecution(recordingExecId);
                setRecordingExecId(null);
                RNFFmpeg.cancel();
                app_service.toast(toast, 'success', 'Votre vidéo a bien été enregistrée', 2000);
                setTimeout(async function () {
                    await ffmpeg.launchLive({ toast }, {
                        setNewFrame,
                        setLiveExecId
                    });
                }, 1000);
            }
        },
        screenshotTap: async ({ toast }, {
            setLoadingScreenshotBtn
        }) => {
            setLoadingScreenshotBtn(true);
            try {
                await ffmpeg.copyFrameFromLiveToImage({toast});
            } catch (reason) {
                console.log("=== SCREENSHOT FAILED ===", reason);
                app_service.toast(toast, 'danger', 'Oups! Impossible prendre un screenshot. Veuillez réessayer', 2000);
            }
            setLoadingScreenshotBtn(false);
        },
        telloOverviewSave: async () => {
            if (TelloClass.time > 0) {
                let data = await SecureStore.getItemAsync(api_secure_store.TELLO_OVERVIEW);
                if (!data || !Array.isArray( JSON.parse(data) ) ) {
                    data = JSON.stringify([]);
                }
                await SecureStore.setItemAsync(api_secure_store.TELLO_OVERVIEW, JSON.stringify([
                    ...(JSON.parse(data)), {
                        //tof: TelloClass.tof.toString().trim(),
                        time: TelloClass.time.toString().trim(),
                        temp: TelloClass.temp.toString().trim(),
                        //height: TelloClass.height.toString().trim(),
                        battery: TelloClass.battery.toString().trim(),
                        createdAt: new Date()
                    }
                ]));
            }
        },
        askForFolderPermissions: async ({ toast }, {}) => {

            try {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
            } catch (failure) {
                app_service.toast(toast, 'danger', `Oups! Impossible d'accorder les permissions`, 2000);
                return;
            }

            const readGranted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );

            const writeGranted = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );

            if (!readGranted || !writeGranted) {
                app_service.toast(toast, 'danger', `Oups! Le dossier LittleFlight est inaccessible`, 2000);
                return false;
            }

            console.log("=== GRANTED ===");

            const listOfFolders = [
                MediaFolderConst.LIVE,
                MediaFolderConst.IMAGE,
                MediaFolderConst.VIDEO,
            ];

            for await (_it of listOfFolders) {
                if (!(await RNFS.exists(_it))) {
                    await RNFS.mkdir(_it);
                    await RNFS.scanFile(_it);
                }
            }

            return true;
        }
    },
    auth: {
        signInSubmit: async (
            { email, password }, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }
        ) => {
            try {
                setLoading(true);

                const _response = await axios.post(
                    api_node_js.PersonCall.sign_in(), {
                        email: email,
                        password: password,
                    }, { timeout: 5000 }
                );

                const _token = _response.data.jwt;

                await SecureStore.setItemAsync(api_secure_store.TOKEN, _token);

                setLoading(false);

            } catch (failure) {

                if (failure.code === 'ECONNABORTED' || failure.message === 'Network Error') {
                    // timeout || network error
                    app_service.toast(toast, 'danger', `Unable to connect to Api. (${ failure.message })`);
                } else if (failure.response) {
                    // an error response (5xx, 4xx)
                    const { data } = failure.response;
                    app_service.toast(toast, 'danger', data);
                } else {
                    // anything else
                    app_service.toast(toast, 'danger', `Login failed.`);
                }

                setLoading(false);

                return;
            }

            await load.appUser({ toast }, {
                appUser: null, setAppUser,
                loading, setLoading,
            });
        },
        signUpSubmit: async (
            { email, password, username }, {
                toast,
                appUser, setAppUser,
                loading, setLoading,
            }
        ) => {
            try {
                setLoading(true);

                const _response = await axios.post(
                    api_node_js.PersonCall.sign_up(), {
                        email: email,
                        password: password,
                        username: username,
                    }, { timeout: 5000 }
                );

                const _token = _response.data.jwt;

                await SecureStore.setItemAsync(api_secure_store.TOKEN, _token);

                setLoading(false);

            } catch (failure) {

                if (failure.code === 'ECONNABORTED' || failure.message === 'Network Error') {
                    // timeout || network error
                    app_service.toast(toast, 'danger', `Unable to connect to Api. (${ failure.message })`);
                } else if (failure.response) {
                    // an error response (5xx, 4xx)
                    const _response = failure.response;
                    app_service.toast(toast, 'danger', _response.data);
                } else {
                    // anything else
                    app_service.toast(toast, 'danger', `Sign up failed.`);
                }

                setLoading(false);

                return;
            }

            await load.appUser({ toast }, {
                appUser: null, setAppUser,
                loading, setLoading,
            });
        },
        signInWithGoogle: async ({ toast }, {
            appUser, setAppUser,
            loading, setLoading,
            GoogleResponse
        }) => {

            console.log("=== GOOGLE ===");

            setLoading(true);

            try {

                if (GoogleResponse.type === 'error') {

                    setLoading(false);

                    app_service.toast(
                        toast,
                        'danger',
                        'Unable to connect to Google'
                    );

                    return;
                }

                if (GoogleResponse.type === 'success') {

                    const _token = GoogleResponse.params.access_token;

                    const _response = await axios.post(
                        api_node_js.PersonCall.sign_in_with_google(_token),
                        {}, { timeout: 5000 }
                    );

                    const _data = _response.data;

                    await SecureStore.setItemAsync(api_secure_store.TOKEN, _data.jwt);

                    setLoading(false);
                }

            } catch (failure) {

                setLoading(false);

                app_service.toast(
                    toast,
                    'danger',
                    failure.code === 'ECONNABORTED' || failure.message === 'Network Error'
                        ? `Unable to connect to Api.`
                        : `Unable to connect to Google. (ECONNABORTED)`
                );

                return;
            }

            await load.appUser({ toast }, {
                appUser: null, setAppUser,
                loading, setLoading,
            });
        }
    },
    home: {
        home: {
            buyVR: async ({ toast, navigation }, {
                appUser,
                setHasVR,
                setAppUser,
                setLoadingGranted,
            }) => {

                if (appUser.dronies < 300) {

                    alert(`Vous n'avez pas assez de dronies (300 minimum, actuellement : ${ appUser.dronies }) 🥺`);

                } else {

                    try {
                        setLoadingGranted(true);

                        const response = await axios.post(
                            api_node_js.DronyCall.buy(), { amount: 300 }, await api_node_js.Config()
                        );

                        setLoadingGranted(false);

                        const data = response.data;

                        console.log("=== BUY VR ===", data);

                        if (appUser) {
                            setAppUser({
                               ...appUser,
                               dronies: data.sender.dronies
                            });
                        }

                        await SecureStore.setItemAsync(api_secure_store.HAS_VR, "HAS_VR");

                        setHasVR(true);

                        app_service.toast(toast, 'success', `Okay, you can use the VR mode !`);

                    } catch (failure) {

                        setLoadingGranted(false);

                        const response = failure.response;

                        const data = response.data;

                        switch (data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            },
        },
        profile: {
            share: async () => {
                try {
                    const _response = await Share.open({
                        message: 'I\'m a droner! See my profile on the new app : LittleFlight',
                        //url: files.appLogo,
                        //urls: [files.image1, files.image2]
                    });
                    console.log('=== SHARE DATA ===', JSON.stringify(_response));

                } catch (failure) {

                    console.log('=== SHARE FAILURE ===', failure);
                }
            },
            addFriend: async ({ toast, navigation }, {
                username,
                setAppUser,
                setLoadingBtn,
                setListOfFriends,
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.post(
                        api_node_js.FriendCall.add(), { username: username }, await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    const _data = _response.data;

                    console.log("=== SEARCH FRIEND DATA ===", _data);

                    setListOfFriends(_data);

                    app_service.toast(toast, 'success', `Okay, ${username} is added !`);

                } catch (failure) {

                    setLoadingBtn(false);

                    const _response = failure.response;

                    //console.log("=== SEARCH FRIEND FAILURE ===", _response);

                    const _data = _response.data;

                    switch (_data) { //UseCase pour les toast lié à l'ajout d'user dans ma friendList
                        case 'MYSELF':
                            app_service.toast(toast, 'danger', `${username} is myself, i can't be friend with myself!`);
                            break;
                        case 'PENDING':
                            app_service.toast(toast, 'danger', `${username} take his time for your invitation...`);
                            break;
                        case 'ACCEPTED':
                            app_service.toast(toast, 'danger', `${username} is already my friend`);
                            break;
                        case 'NOT FOUND':
                            app_service.toast(toast, 'danger', `${username} doesn't exist`);
                            break;
                        case 'Invalid token.':
                            setAppUser(null);
                            redirect_to.auth(navigation);
                            break;
                    }
                }
            },
            acceptFriend: async ({ friendId, navigation }, {
                setAppUser,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.patch(
                        api_node_js.FriendCall.accept(friendId), {}, await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    if (_response) {
                        const _data = _response.data;
                        setListOfFriends(_data);
                    }

                } catch (failure) {

                    setLoadingBtn(false);

                    const _response = failure.response;

                    if (_response) {

                        const _data = _response.data;

                        console.log("=== FJIOSJO ===", _data);

                        switch (_data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                            case 'Malformed token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            },
            rejectFriend: async ({ friendId, navigation }, {
                setAppUser,
                setLoadingBtn,
                setListOfFriends
            }) => {
                try {
                    setLoadingBtn(true);

                    const _response = await axios.delete(
                        api_node_js.FriendCall.reject(friendId), await api_node_js.Config()
                    );

                    setLoadingBtn(false);

                    if (_response) {
                        const _data = _response.data;
                        setListOfFriends(_data);
                    }

                } catch (failure) {

                    setLoadingBtn(false);

                    const _response = failure.response;

                    if (_response) {
                        const _data = _response.data;
                        console.log(_data);
                        switch (_data) {
                            case 'Invalid token.':
                                setAppUser(null);
                                redirect_to.auth(navigation);
                                break;
                        }
                    }
                }
            },
        },
        recordings: {
            share: async ({url}) => { //Fonction pour partager sur les réseaux les Photos/Videos depuis l'url du FS
                try {
                    const _response = await Share.open({
                        message: 'I\'m a droner! See my profile on the new app : LittleFlight', //Message par defaut avec le partage
                        url: url, //Url de l'image/Video du FS
                    });
                    console.log('=== SHARE DATA ===', JSON.stringify(_response));

                } catch (failure) {

                    console.log('=== SHARE FAILURE ===', failure);
                }
            },
            tabChange: ({ index }, { setTabIndex }) => setTabIndex(index), //Permet de modifier le TabIndex pour changer le contenu de la View
            readPhotos: async ({}, { setListOfPhotos }) => { //Function Get photos du dossier LittleFlight_Image
                try {
                    const listOfPhotos = await RNFS.readDir(MediaFolderConst.IMAGE);//Read la liste des photos du folder Image de l'appli
                    setListOfPhotos(listOfPhotos);
                } catch (failure) {
                    console.log("=== LIST OF PHOTOS ===", failure);
                }
            },
            readVideos: async ({}, { setListOfVideos }) => { //Function Get Video du dossier LittelFlight_Video
                try {
                    const listOfVideos = await RNFS.readDir(MediaFolderConst.VIDEO); //Read la liste des vidéos
                    setListOfVideos(listOfVideos);
                } catch (failure) {
                    console.log("=== LIST OF VIDEOS ===", failure);
                }
            },
            initFoldersAndMedias: async ({}, {
                setListOfPhotos, setListOfVideos
            }) => {
                try {
                    await PermissionsAndroid.requestMultiple([ //Permission READ/WRITE de l'external storage du téléphone
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    ]);
                } catch (failure) {
                    console.log("=== INIT FOLDERS ===", failure);
                }

                const readGranted = await PermissionsAndroid.check( //Check permission READ
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
                );
                const writeGranted = await PermissionsAndroid.check( //Check permission Write
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );

                if (!readGranted || !writeGranted) {
                    console.log(
                        "=== INIT FOLDERS ===",
                        'Read and write permissions have not been granted'
                    );
                    return;
                }

                console.log("=== GRANTED ===");

                const listOfFolders = [
                    MediaFolderConst.VIDEO,
                    MediaFolderConst.IMAGE,
                ];

                for await (_it of listOfFolders) {
                    if (!(await RNFS.exists(_it))) {
                        await RNFS.mkdir(_it);
                        await RNFS.scanFile(_it);
                    }
                }

                await on.home.recordings.readPhotos({}, { setListOfPhotos });
                await on.home.recordings.readVideos({}, { setListOfVideos });
            },
        },
        footerTabChange: ({ index }, { setTabIndex }) => setTabIndex(index)
    },
    profile: {
        sendGift: async ({ toast, friend, amount }, {
            appUser,
            setAppUser,
            setDronies,
            setLoadingBtn
        }) => {
            try {
                setLoadingBtn(true);
                const response = await axios.post(
                    api_node_js.DronyCall.send_to_friend(friend._id), { amount }, await api_node_js.Config()
                );
                const data = response.data;
                const dronies = data.sender.dronies;
                if (appUser) {
                    setAppUser({
                        ...appUser, dronies: dronies
                    });
                }
                setDronies(dronies);
                app_service.toast(toast, 'success', `Good transaction! +${ amount } to ${friend.username} and +25 for you!`);
            } catch (failure) {
                console.log('=== SEND BUG REPORT ===', failure);
                app_service.toast(toast, 'danger', `Ooops, an eror has been declared !`);
            }
            setLoadingBtn(false);
        },

    }
};

export default on
