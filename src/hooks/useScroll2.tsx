/* eslint-disable */
import React, { MutableRefObject, useEffect, useRef } from "react";
import { doc, collection, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../lib/firebase";

export default function useChatScroll2(
  dep: any[],
  supportId: string
): MutableRefObject<HTMLDivElement | null> {
  const chats = collection(database, "support");
  const chatIdCount = doc(chats, `${supportId}`);

  async function resetCount() {
    const doc = await getDoc(chatIdCount);

    if (doc.data()) {
      updateDoc(chatIdCount, {
        support: {
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
  }, [dep, supportId]);

  return ref
}