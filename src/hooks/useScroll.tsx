/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc, onSnapshot } from "firebase/firestore";
import { database } from "../lib/firebase";

export default function useChatScroll(
  dep: any[],
  chatId: string,
  status: boolean
): MutableRefObject<HTMLDivElement | null> {
  const chats = collection(database, "chats");
  const chatIdCount = doc(chats, `${chatId}`);

  async function resetCount() {
    const doc = await getDoc(chatIdCount);

    if (doc.data()) {
      updateDoc(chatIdCount, {
        consultant: {
          count: 0,
        },
      });
    }
  }

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
      resetCount();
    }
  }, [dep, chatId]);

  return ref
}