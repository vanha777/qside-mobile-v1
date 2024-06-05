"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scan, textRecord, uriRecord, write } from "@tauri-apps/plugin-nfc";
interface SocialUser {
    type: string;
    image: string;
    title: string;
    url: string;
    description: string;
    icon: string;
}

interface SliderItemProps {
    socialUser: SocialUser; // Replace 'object' with a more specific type if available
    fetchSocial: (type: string, url: string) => Promise<void>; // Replace the function signature if it has parameters or a return type
}

const getUsernameFromUrl = (url: String) => {
    if (!url) return "";
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
};

const getBaseUrl = (url: String) => {
    if (!url) return "";
    const urlParts = url.split('/');
    if (url.includes("linkedin.com")) {
        return urlParts.slice(0, 4).join('/') + '/';
    } else if (url.includes("github.com")) {
        return urlParts.slice(0, 3).join('/') + '/';
    } else {
        return urlParts.slice(0, 3).join('/') + '/';
    }
};

const SliderItem: React.FC<SliderItemProps> = ({ socialUser, fetchSocial }) => {
    const [nfcResponse, setNfcResponse] = useState<any>("")
    const [nfcError, setNfcError] = useState("");
    const activateReadNfc = async () => {
        console.log("trying to read Nfc")
        try {
            const read = await scan({ type: "tag" });
            console.log("activate nfc ", read);
            setNfcResponse(read);
        } catch (error) {
            setNfcError("Error from write");
            console.error("Error writing to NFC tag", error);
        }
    };

    const activateWritedNfc = async () => {
        console.log("trying to write Nfc")
        // const read = await scan({ type: "tag", keepSessionAlive: true });
        const writeInfo = await write([uriRecord("https://www.tiktok.com/@eazyhomeiot")]);
        try {
            await write([uriRecord("https://www.tiktok.com/@eazyhomeiot")]);
            console.log("NFC write successful");
        } catch (error) {
            setNfcError("Error from write");
            console.error("Error writing to NFC tag", error);
        }
        console.log("activate nfc ", writeInfo);
        setNfcResponse(writeInfo);
    };
    // let username = getUsernameFromUrl(socialUser.url);
    const [edit, setEdit] = useState(false);
    const [username, setUsername] = useState(getUsernameFromUrl(socialUser.url));
    // const [inputValue, setInputValue] = useState(username || "");
    const [inputValue, setInputValue] = useState("");

    const fetch = (type: string) => {
        if (edit == false) {
            setEdit(true);
            return;
        } else if (edit == true) {
            let url = getBaseUrl(socialUser.url) + inputValue;
            console.log("input value", inputValue);
            console.log("fetch new social ", type);
            console.log("url ", url);
            fetchSocial(type, url)
            setEdit(false);
        }
    };

    const icon = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    };

    useEffect(() => {
        setUsername(getUsernameFromUrl(socialUser.url));
    }, [socialUser.url]);
    return (

        <div className="carousel-item">

            {/* <div style={{ perspective: 1000 }}>
                <motion.div
                    style={{
                        width: 300,
                        height: 150,
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontSize: '1.5rem',
                        color: '#333',
                    }}
                    initial={{
                        opacity: 1,
                        rotateX: 0,
                        rotateY: -7,
                    }}
                    animate={{
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 7,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        // ease: 'easeInOut',
                    }}
                >
                    Your Business Card
                </motion.div>
            </div> */}

            {/* <div className="container">
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="item"
                >
                    <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            default: { duration: 2, ease: "easeInOut" },
                            fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                    />
                </motion.svg>
            </div> */}

            <div className="card w-96 glass">

                <figure className='px-3 pt-3'>
                    <div className="card w-96 shadow-xl p-2 indicator">

                        <div style={{ perspective: 1000 }}>
                            <motion.div
                                style={{
                                    // width: 300,
                                    // height: 150,
                                    // backgroundColor: 'white',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    fontSize: '1.5rem',
                                    color: '#333',
                                }}
                                initial={{
                                    opacity: 1,
                                    rotateX: -7,
                                    rotateY: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotateX: 7,
                                    rotateY: 10,
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: 'mirror',
                                    // ease: 'easeInOut',
                                }}
                            >

                                {/* <span className="indicator-item indicator-top indicator-start">
                                        <img className="" src="qside-logo-trans.png" alt="car!" style={{ width: '100px', height: '25px' }} />
                                    </span> */}

                                <img className=" card w-full" src="opengraph-image.png" alt="car!" />
                                {/* <img className=" card w-full" src="qside-logo.png" alt="car!" /> */}


                            </motion.div>
                        </div>
                    </div>
                </figure>


                <div className="relative">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                {socialUser.image !== "" ? (
                                    <a href={socialUser.url}>
                                        <img src={socialUser.image} alt="avatar" />
                                    </a>
                                ) : (
                                    <div className="skeleton w-32 h-32"></div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body pt-16">

                    <div className=' flex flex-row justify-between items-center'>
                        {nfcResponse && (
                            <div>{JSON.stringify(nfcResponse)}</div>
                        )}
                        {edit == false ? (
                            <a href={socialUser.url} className="link link-primary">@{username}</a>
                        ) : (
                            <input value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={username} className="input input-bordered input-primary w-full max-w-xs" />
                        )}
                        <img src={socialUser.icon} alt="icon" className="w-12 h-12" />

                    </div>

                    {socialUser.description !== "" ? (
                        <textarea className="dark flex textarea" placeholder={socialUser.description}></textarea>

                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    )}
                    <div className="card-actions justify-end">
                        {edit == true ? (
                            <button onClick={() => fetch(socialUser.type)} className="btn btn-primary">Sync</button>
                        ) : (
                            <button onClick={() => fetch(socialUser.type)} className="btn btn-primary">Edit</button>
                        )}

                        <button onClick={activateReadNfc} className="btn btn-primary">Read</button>
                        <button onClick={activateWritedNfc} className="btn btn-primary">Write</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderItem;