import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axios";
import {
  Activity,
  MoreHorizontal,
  Pin,
  PinOff,
  Trash,
  Link as LinkIcon,
  LogOut,
  Info,
  Lock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmLeaveRoomModal from "@/components/ConfirmLeaveRoomModal";

export default function RoomCard({
  room,
  onDelete,
  showCategory,
  loading,
  onRoomNotFound,
  isJoinedRoom = false,
  onLeaveRoom,
}) {
  const [isPinned, setIsPinned] = useState(false);
  const [joinStatus, setJoinStatus] = useState(null); // 'member', 'pending', 'none'
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const navigate = useNavigate();

  // Load pinned state
  useEffect(() => {
    if (!room) return;
    const pinned = JSON.parse(localStorage.getItem("pinnedRooms") || "[]");
    const found = pinned.some((r) => r._id === room._id);
    setIsPinned(found);
  }, [room, room?._id]);

  // Load join status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (room && user) {
      axiosInstance
        .get(`/session-room/${room._id}/join-status`)
        .then((res) => setJoinStatus(res.data.status))
        .catch((error) => {
          if (error.response?.status === 404 && onRoomNotFound) {
            onRoomNotFound(room._id);
          }
          setJoinStatus(null);
        });
    }
  }, [room, onRoomNotFound]);

  // Poll join-status periodically to stay updated
  useEffect(() => {
    if (!room?._id) return;
    let intervalId;
    let canceled = false;

    const fetchStatus = () => {
      axiosInstance
        .get(`/session-room/${room._id}/join-status`)
        .then((res) => {
          if (!canceled) setJoinStatus(res.data.status);
        })
        .catch((error) => {
          if (error.response?.status === 404 && onRoomNotFound && !canceled) {
            onRoomNotFound(room._id);
            if (intervalId) clearInterval(intervalId);
          }
        });
    };

    fetchStatus();
    intervalId = setInterval(fetchStatus, 5000);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") fetchStatus();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      canceled = true;
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [room?._id, onRoomNotFound]);

  const handleJoin = async () => {
    if (loading) return;
    try {
      if (room.isPrivate) {
        if (joinStatus === "member") {
          const res = await axiosInstance.post(`/session-room/${room._id}/join`);
          toast.success(res.data?.message || "Entering room...");
          navigate(`/session/${room._id}`);
        } else if (joinStatus === "pending") {
          toast.info("Your join request is pending approval.");
        } else {
          await axiosInstance.post(`/session-room/${room._id}/request-join`);
          setJoinStatus("pending");
          toast.success("Join request sent.");
        }
      } else {
        await axiosInstance.post(`/session-room/${room._id}/join`);
        toast.success("Joining room...");
        setJoinStatus("member");
        navigate(`/session/${room._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to join room");
    }
  };

  const handleCancelRequest = async () => {
    if (loading) return;
    try {
      await axiosInstance.post(`/session-room/${room._id}/cancel-request`);
      setJoinStatus("none");
      toast.success("Join request canceled.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to cancel request");
    }
  };

  const handlePin = () => {
    if (loading) return;
    try {
      const raw = localStorage.getItem("pinnedRooms") || "[]";
      const arr = JSON.parse(raw);
      const exists = arr.some((r) => r._id === room._id);
      if (!exists) {
        arr.push(room);
        localStorage.setItem("pinnedRooms", JSON.stringify(arr));
        setIsPinned(true);
        toast.success("Room pinned to home.");
      }
    } catch {
      localStorage.setItem("pinnedRooms", JSON.stringify([room]));
      setIsPinned(true);
    }
  };

  const handleUnpin = () => {
    if (loading) return;
    try {
      const raw = localStorage.getItem("pinnedRooms") || "[]";
      const arr = JSON.parse(raw).filter((r) => r._id !== room._id);
      localStorage.setItem("pinnedRooms", JSON.stringify(arr));
      setIsPinned(false);
      toast.info("Room unpinned.");
    } catch {
      console.error("Failed to unpin room.");
    }
  };

  const handleCopyLink = () => {
    if (loading) return;
    const link = `${window.location.origin}/session/${room._id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Room link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const handleLeaveRoom = () => setShowLeaveModal(true);

  const confirmLeaveRoom = async () => {
    if (loading) return;
    try {
      await axiosInstance.post(`/session-room/${room._id}/leave`);
      toast.success("Left room successfully");
      setShowLeaveModal(false);
      if (onLeaveRoom) onLeaveRoom(room._id);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to leave room");
    }
  };

  const cancelLeaveRoom = () => setShowLeaveModal(false);

  if (loading) {
    return (
      <div className="relative bg-sec backdrop-blur-md p-6 rounded-3xl shadow animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-40 bg-gray-300 rounded-md"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        {showCategory && (
          <div className="mb-4">
            <div className="h-4 w-24 bg-gray-300 rounded-md mb-1"></div>
            <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
          </div>
        )}

        <div className="mb-4">
          <div className="h-3 w-full bg-gray-300 rounded-md mb-2"></div>
          <div className="h-3 w-4/5 bg-gray-300 rounded-md"></div>
        </div>

        <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-sec backdrop-blur-md p-6 rounded-3xl shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold txt flex items-center gap-2">
            {room.name}
            {room.isPrivate && <Lock size={22} className="txt-dim" />}
          </h3>
          {isPinned && (
            <span title="Pinned">
              <Pin size={18} className="rotate-45 ml-1" />
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="transparent"
            size="icon"
            className="txt hover:txt-dim"
            onClick={() => setShowInfoPopup(true)}
          >
            <Info className="w-6 h-6" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="transparent" size="icon" className="txt hover:txt-dim">
                <MoreHorizontal className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-ter rounded-xl shadow-md">
              {!isPinned ? (
                <DropdownMenuItem onClick={handlePin} className="flex items-center gap-2 txt cursor-pointer">
                  <Pin size={18} />
                  Pin to home
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleUnpin} className="flex items-center gap-2 txt cursor-pointer">
                  <PinOff size={18} />
                  Unpin from home
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleCopyLink} className="flex items-center gap-2 txt cursor-pointer">
                <LinkIcon size={18} />
                Copy Link
              </DropdownMenuItem>
              {isJoinedRoom && (
                <DropdownMenuItem onClick={handleLeaveRoom} className="flex items-center gap-2 text-red-500 cursor-pointer">
                  <LogOut size={18} />
                  Leave Room
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem onClick={() => onDelete(room)} className="flex items-center gap-2 text-red-500 cursor-pointer">
                  <Trash size={18} />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showCategory && (
        <p className="txt-dim mb-4 capitalize">
          Category: <span className="font-medium">{room.cateogery}</span>
        </p>
      )}

      {room.description && <p className="txt-dim mb-2">{room.description}</p>}

      <p className="txt-dim mb-4">{room.members?.length || 0} Members</p>

      {/* ---- Join Button  ---- */}
      {isJoinedRoom ? (
        <Button onClick={handleJoin} className="w-full flex items-center justify-center gap-2">
          <Activity className="w-5 h-5" /> Enter Room
        </Button>
      ) : room.isPrivate ? (
        joinStatus === "member" ? (
          <Button onClick={handleJoin} className="w-full flex items-center justify-center gap-2">
            <Activity className="w-5 h-5" /> Enter Room
          </Button>
        ) : joinStatus === "pending" ? (
          <Button onClick={handleCancelRequest} className="w-full flex items-center justify-center gap-2">
            Cancel Request
          </Button>
        ) : (
          <Button onClick={handleJoin} className="w-full flex items-center justify-center gap-2">
            Request Join
          </Button>
        )
      ) : joinStatus === "member" ? (
        <Button onClick={handleJoin} className="w-full flex items-center justify-center gap-2">
          <Activity className="w-5 h-5" /> Enter Room
        </Button>
      ) : (
        <Button onClick={handleJoin} className="w-full flex items-center justify-center gap-2">
          <Activity className="w-5 h-5" /> Join
        </Button>
      )}

      {/* ---- Leave Confirmation Modal ---- */}
      {showLeaveModal && (
        <ConfirmLeaveRoomModal
          roomName={room.name}
          onConfirm={confirmLeaveRoom}
          onCancel={cancelLeaveRoom}
        />
      )}

      {/* ---- Info Popup ---- */}
      {showInfoPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl">
          <div className="relative bg-white text-black p-6 rounded-2xl shadow-lg w-[28rem] max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowInfoPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">{room.name}</h3>

            {/* Owner Section */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Room Owner</h4>
              <div className="border rounded-xl p-3 flex items-center gap-3 w-full">
                <img
                  src={room.createdBy?.ProfilePicture}
                  alt="Owner"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">
                    {room.createdBy ? room.createdBy.Username : "Unknown Owner"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {room.createdBy?.Bio || "No bio available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Members Section */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Members</h4>
              <div className="flex flex-col gap-3">
                {room.members && room.members.length > 0 ? (
                  room.members.map((m, i) => (
                    <div
                      key={i}
                      className="border rounded-xl p-3 flex items-center gap-3 bg-gray-50 w-full"
                    >
                      <img
                        src={m?.ProfilePicture}
                        alt="Member"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {m?.Username?.trim() || "Member"}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {m?.Bio || "No bio available"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No members yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
