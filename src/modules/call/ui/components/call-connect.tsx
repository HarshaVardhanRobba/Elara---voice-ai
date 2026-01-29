"use client";

import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient
} from "@stream-io/video-react-sdk";

import { useEffect, useState } from "react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { CallUI } from "./call-ui";

interface CallConnectProps {
    meetingId: string
    meetingname: string
    userId: string
    userName: string
    userImage: string
};

export const CallConnect = ({ 
    meetingId, 
    meetingname, 
    userId, 
    userName, 
    userImage }: CallConnectProps) => {

        const trpc = useTRPC();

        const { mutateAsync: generateToken } = useMutation(trpc.meetings.generateToken.mutationOptions(),
    );

    const [Client, setClient] = useState<StreamVideoClient>();

    useEffect(() => {
        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage,
            },
            tokenProvider: generateToken,
        });

        setClient(_client);

        return () => {
            _client.disconnectUser();
            setClient(undefined);
        };
    }, [userId, userName, userImage, generateToken]);

    const [call, setCall] = useState<Call>();
    useEffect(() => {
        if (!Client) return;

        const _call = Client.call("default", meetingId);
        _call.camera.disable();
        _call.microphone.disable();
        setCall(_call);

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave();
                _call.endCall();
                setCall(undefined);
            }
        };
    }, [Client, meetingId]);

    if(!Client || !call) {
        return ( 
            <div className="flex h-screen w-screen items-center justify-center bg-linear-to-br from-emerald-900 via-green-900 to-teal-900">
                    <Loader2Icon className="h-6 w-6 animate-spin text-white/80" />
            </div>
        )
    } 

    return (
        <StreamVideo client={Client} >
            <StreamCall call={call}>
                <CallUI meetingName={meetingname}/>
            </StreamCall>
        </StreamVideo>
    );
}