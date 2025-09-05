"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

function AppSidebar() {

    const path = usePathname();


    return (
        <Sidebar className='flex h-full flex-col space-y-4'>
            <SidebarHeader className='flex flex-col items-center space-y-4 pb-4 mt-5'>
                <Link href={'/'}>
                <Image className="w-[150px]" src={'/logo.png'} alt="logo" width={120} height={32} />
                </Link>
                <Link href='/dashboard/create-interview'>
                <Button size="sm" className='w-full mt-5 cursor-pointer'><Plus className="mr-2 h-4 w-4" /> Create New Interview</Button>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            {SideBarOptions.map((option, index) => {
                                return (
                                    <SidebarMenuItem key={index} className='p-1'>
                                        <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-50'} `}>
                                            <Link href={option.path}>
                                                <option.icon className={`${path == option.path && 'text-primary'}`} />
                                                <span className={`text-[16px] font-medium  ${path == option.path && 'text-primary'}`}>{option.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default AppSidebar