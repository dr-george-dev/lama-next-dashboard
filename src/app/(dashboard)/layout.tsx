//First step: create a layout file in the dashboard folder - dr-george
// We added a diffrent layout here for the dashboard pages
// We copied the layout from the main app
//We renamed the fuction to DashboardLayout

import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/navbar";

//Second step- dr-george
//We are editing the return statement in the dashboard layout function
//creating the skeleton for our left and right


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    //Inside here we add tailwinds css that makes our dashboard reponsive -dr-george
    <div className="h-screen flex">
      {/*Left Sidebar*/}

    {/*We added the logo inside the left sidebar - dr-george*/}

      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link href="/" className="flex items-center justify-center gap-2">
        <Image src="/unipod-logo.png" alt="logo" width={150} height={100}/>
        {/* <span className="hidden lg:block font-bold">UniPod</span> */}
        </Link>
        {/* hold ctrl and select the line below to see the Menu component */}
        <Menu />
      </div>
      {/*Right Sidebar*/}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
