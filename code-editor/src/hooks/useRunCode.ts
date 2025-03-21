"use client";
import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
        const response = await fetch(
          "http://localhost:3000/api/v1/problem/test",
          {
            method: "POST",
            body: JSON.stringify({
              problemId: problemId,
              userCode,
            }),
          }
        ).then(async (res) => res.json());
        setData(response.data);
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
