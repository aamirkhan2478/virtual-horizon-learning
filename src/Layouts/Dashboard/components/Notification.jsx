import {
  useClearNotifications,
  useDeleteNotification,
  useMarkNotificationAsRead,
  useNotifications,
} from "@/hooks/useNotification";
import { Bell, CheckCircle, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "./ui/use-toast";
import { useQueryClient } from "react-query";
import moment from "moment";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize navigate
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: markNotificationAsRead, isLoading: marking } =
    useMarkNotificationAsRead(onSuccess, onError);
  const { mutate: deleteNotification, isLoading: deleting } =
    useDeleteNotification(onSuccess, onError);
  const { mutate: clearNotifications, isLoading: clearing } =
    useClearNotifications(onSuccess, onError);

  const toggleNotifications = () => setIsOpen(!isOpen);

  const notificationRef = useRef(null);

  const markAsRead = (id, event) => {
    event.stopPropagation();
    markNotificationAsRead(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    });
  };

  const dismissNotification = (id, event) => {
    event.stopPropagation();
    deleteNotification(id, {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    });
  };

  const clearAllNotifications = () => {
    clearNotifications(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries("notifications");
        },
      }
    );
  };

  const unreadCount = notifications?.filter((notify) => !notify.read).length;

  function onSuccess(data) {
    toast({
      variant: "default",
      title: "Success",
      description: data.message,
      className: "bg-green-500 text-white",
    });
  }

  function onError(error) {
    toast({
      variant: "default",
      title: "Error",
      description: error.message,
      className: "bg-red-500 text-white",
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-5" ref={notificationRef}>
      <button
        onClick={toggleNotifications}
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute -right-16 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-10 transition-all duration-300 ease-in-out transform origin-top-right"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 font-medium">
              Notifications
            </div>
            {isLoading ? (
              <ReloadIcon className="animate-spin h-6 w-6 mx-auto my-4" />
            ) : notifications.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                No new notifications
              </div>
            ) : (
              <>
                {notifications.map((notify) => (
                  <div
                    key={notify.id}
                    className={`px-4 py-2 hover:bg-gray-100 transition-colors duration-200 cursor-pointer ${notify.read ? "opacity-50" : ""}`}
                    onClick={() => navigate(`/dashboard/schedule/${notify.id}`)} // Handle navigation
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{notify.title}</div>
                      <div className="text-xs text-gray-500">
                        {moment(notify.created_at).fromNow()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {notify.message}
                    </p>
                    <div className="mt-2 flex justify-end space-x-2">
                      {!notify.read && (
                        <button
                          onClick={(e) => markAsRead(notify.id, e)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                          aria-label="Mark as read"
                        >
                          {marking ? (
                            <ReloadIcon className="inline mr-1 animate-spin" />
                          ) : (
                            <CheckCircle className="inline mr-1" />
                          )}
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={(e) => dismissNotification(notify.id, e)}
                        className="text-xs text-red-600 hover:text-red-800"
                        aria-label="Dismiss notification"
                      >
                        {deleting ? (
                          <ReloadIcon className="inline mr-1 animate-spin" />
                        ) : (
                          <Trash className="inline mr-1" />
                        )}
                        Dismiss
                      </button>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 px-4 py-2">
                  <button
                    onClick={clearAllNotifications}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    {clearing && (
                      <ReloadIcon className="inline mr-1 animate-spin" />
                    )}
                    Clear all notifications
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
