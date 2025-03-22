"use client";
import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function useRunCode() {
  const [data, setData] = useState();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

  const mutate = useCallback(
    async ({
      problemId,
      userCode,
    }: {
      problemId: string;
      userCode: string;
    }) => {
      setIsIdle(false);
      setIsPending(true);
      try {
        const response = await api.post("/problem/test", {
          problemId,
          userCode,
        });
        setData(response.data.data);
      } catch (err) {
        setIsError(true);
      }
      setIsIdle(true);
      setIsPending(false);
    },
    []
  );

  return {
    data,
    isIdle,
    isPending,
    isError,
    mutate,
  };
}
