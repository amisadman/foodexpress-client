import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { UserService } from "@/services/user.service";
import React from "react";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await UserService.getSession();

  let isLoggedIn = false;

  if (session.success === true) isLoggedIn = true;
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn}></Navbar>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
