import { authClient } from "@/lib/auth-client";
import { GenerateAvatarUri } from "@/lib/avatar";
import { 
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview
} from "@stream-io/video-react-sdk";
import Link from "next/link";

interface CallLobbyProps {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder 
      participant={
        {
          name: data?.user.name ?? "",
          image: data?.user.image ?? GenerateAvatarUri({
            seed: data?.user.name ?? "",
            variant: "initials"
          }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm text-gray-400 text-center px-4">
      Please grant browser access to your camera and microphone
    </p>
  );
};

export const CallLobby = ({ onJoin }: CallLobbyProps) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission = hasMicPermission && hasCameraPermission;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg rounded-xl bg-gray-800 p-6 shadow-lg">
        <div className="flex flex-col items-center gap-4">

          <div className="text-center">
            <h6 className="text-lg font-semibold">Ready to join</h6>
            <p className="text-sm text-gray-400">
              Setup your camera and mic before joining
            </p>
          </div>

          {/* VIDEO PREVIEW */}
          <div className="w-full aspect-video min-h-[360px] overflow-hidden rounded-lg bg-black flex items-center justify-center">
            <VideoPreview 
              DisabledVideoPreview={
                hasBrowserMediaPermission 
                  ? DisabledVideoPreview 
                  : AllowBrowserPermissions
              } 
            />
          </div>

          {/* CONTROLS */}
          <div className="flex gap-4">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>

          {/* JOIN BUTTON */}
          <button
            onClick={onJoin}
            disabled={!hasBrowserMediaPermission}
            className="mt-4 w-full rounded-lg bg-blue-600 py-2 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
          >
            Join Call
          </button>
          <Link
                href="/meetings"
                className={`w-full text-center rounded-lg bg-red-600 py-2 font-medium transition hover:bg-red-700 ${
                    !hasBrowserMediaPermission ? "pointer-events-none bg-gray-600" : ""
                }`}
                >
                Leave
            </Link>
        </div>
      </div>
    </div>
  );
};
