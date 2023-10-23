"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const NotFoundMessage = () => {
  return (
    <>
      <h2 className="text-primary">404</h2>
      <h3>Page Not Found.</h3>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </>
  );
};

export default NotFoundMessage;
