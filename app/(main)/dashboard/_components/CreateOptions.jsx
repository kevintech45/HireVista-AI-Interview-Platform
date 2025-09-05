import { Phone, Video } from "lucide-react";
import Link from "next/link";

export default function CreateOptions() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 

          
            <Link href={'/dashboard/create-interview'} className="bg-white p-4 rounded-lg border flex items-center space-x-3 cursor-pointer shadow-xs"> {/* Reduce p, space-x */}
              
                <div className="bg-blue-100 p-2 rounded-md"> 
                    <Video className="h-5 w-5 text-primary" /> 
                </div>

               
                <div>
                    <h2 className="font-semibold text-base">Create New Interview</h2> 
                    <p className="text-xs text-gray-500"> 
                        Create AI interviews and schedule them with candidates
                    </p>
                </div>
            </Link>

            
            <div className="bg-white p-4 rounded-lg border flex items-center space-x-3 shadow-xs"> 
                
                <div className="bg-blue-100 p-2 rounded-md"> 
                    <Phone className="h-5 w-5 text-primary" /> 
                </div>

               
                <div>
                    <h2 className="font-semibold text-base">Create Phone Screening Call</h2> 
                    <p className="text-xs text-gray-500"> 
                        Schedule phone screening calls with potential candidates
                    </p>
                </div>
            </div>

        </div>
    );
}