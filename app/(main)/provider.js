import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomeContainer from './dashboard/_components/WelcomeContainer'

const DashboardProvider = ({ children }) => {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <div className='w-full p-10'>
                    {/* <SidebarTrigger /> */}
                    <WelcomeContainer />
                    {children}
                </div>
            </SidebarProvider>

        </div>
    )
}

export default DashboardProvider