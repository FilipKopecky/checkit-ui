import React, { useCallback, useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useGetNotificationsQuery } from "../../api/notificationApi";
import { useAppSelector } from "../../hooks/ReduxHooks";
import { selectLanguage } from "../../slices/languageSlice";
import LoadingOverlay from "../misc/LoadingOverlay";
import ErrorAlert from "../misc/ErrorAlert";
import EmptyPlaceholder from "../misc/VirtuosoEmptyPlaceholder";
import { Notification } from "../../model/Notification";
import NotificationItem from "./NotificationItem";
import List from "../misc/VirtuosoMuiList";

const NotificationList: React.FC = () => {
  const languageSelector = useAppSelector(selectLanguage);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    data: notifications,
    isLoading,
    error,
  } = useGetNotificationsQuery({
    languageTag: languageSelector.language,
    pageNumber: pageNumber,
  });
  const [loadedNotifications, setLoadedNotifications] = useState<
    Notification[]
  >([]);
  useEffect(() => {
    if (notifications && notifications.length !== 0) {
      setLoadedNotifications((prevValue) => {
        if (
          prevValue.some((el: Notification) => el.uri === notifications[0].uri)
        ) {
          return prevValue;
        }
        return [...prevValue, ...notifications];
      });
    }
  }, [notifications, setLoadedNotifications]);

  const loadMore = useCallback(() => {
    if (pageNumber === 0 || !notifications) {
      setPageNumber((prevState) => prevState + 1);
    }
  }, [notifications, pageNumber]);
  if (isLoading) return <LoadingOverlay />;
  if (error || !notifications) return <ErrorAlert />;
  return (
    <Virtuoso
      style={{ height: 300 }}
      data={loadedNotifications}
      endReached={loadMore}
      itemContent={(index, notification) => {
        return <NotificationItem notification={notification} />;
      }}
      components={{ List, EmptyPlaceholder: EmptyPlaceholder }}
    />
  );
};

export default NotificationList;
