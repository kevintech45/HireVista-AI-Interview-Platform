// "use client"
// import { UserDetailContext } from '@/context/UserDetailContext'
// import { supabase } from '@/services/supabaseClient'
// import React, { useContext, useEffect, useState } from 'react'

// const Provider = ({ children }) => {

//     const [user, setuser] = useState()
//     useEffect(() => {
//         CreateNewUser()
//     }, [])

//     const CreateNewUser = () => {

//         supabase.auth.getUser().then(async ({ data: { user } }) => {

//             //check if user allready exists
//             let { data: Users, error } = await supabase
//                 .from('Users')
//                 .select("*")
//                 .eq('email', user?.email)
//             console.log(Users)

//             if not    the create new user

//             if (Users?.length == 0) {
//                 const { data, error } = await supabase.from('Users').insert([{
//                     id: user?.id,
//                     name: user.user_metadata?.name,
//                     email: user?.email,
//                     picture: user?.user_metadata.picture
//                 }

//                 ])
//                     .select() // FIX: Add .select() to return the newly created row.
//                     .single(); // FIX: Use .single() to get the object directly.
//                 console.log(data)
//                 setuser(data)
//                 return
//             }
//             setuser(Users[0])
//         })

//     }

//     return (
//         <div>
//             <UserDetailContext.Provider value={{ user, setuser }}>
//                 <div>{children}</div>
//             </UserDetailContext.Provider>
//         </div>
//     )
// }


//export default Provider


"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

// It's good practice to create the context in the same file or a dedicated one.
export const UserDetailContext = createContext(null);

const Provider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // This function will handle creating/fetching our custom user profile.
        // It's called by the auth listener.

        const syncUserProfile = async (authUser) => {
            console.log("syncUserProfile triggered. Auth user:", authUser); // For debugging

            // If there's no authenticated user (e.g., after logout), clear the profile.
            if (!authUser) {
                setUserProfile(null);
                return;
            }

            // BEST PRACTICE: Always check for an existing user by their unique ID.
            let { data: existingUser, error: selectError } = await supabase
                .from('Users')
                .select('*')
                .eq('id', authUser.id) // Query by the user's unique 'id' (uuid).
                .single();

        if (selectError && selectError.code !== 'PGRST116') { // 'PGRST116' means "row not found", which is fine.
            console.error("Error fetching user profile:", selectError, JSON.stringify(selectError, null, 2));
            return;
            }

            // If the user profile already exists in our table, set it and we're done.
            if (existingUser) {
                console.log("User profile found in database:", existingUser);
                setUserProfile(existingUser);
                return;
            }

            // If no profile exists, we create a new one.
            console.log("User profile not found. Creating a new one.");

            const { data: newUser, error: insertError } = await supabase
                .from('Users')
                .insert({
                    id: authUser.id, // CRITICAL: Provide the user's auth ID.
                    name: authUser.user_metadata?.full_name || authUser.user_metadata?.name,
                    email: authUser.email,
                    picture: authUser.user_metadata?.picture,
                })
                .select() // Add .select() to return the newly created row.
                .single();

            if (insertError) {
                console.error("Error creating user profile:", insertError.message);
            } else {
                console.log("Successfully created new user profile:", newUser);
                setUserProfile(newUser);
            }
        };

        // This is the correct way to handle auth state.
        // It runs once on load and then LISTENS for logins/logouts.
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log(`Auth event: ${event}`, session); // VERY useful for debugging!
                // `session.user` is the user object from Supabase's 'auth.users' table.
                // We pass it to our sync function when the user signs in.
                if (event === 'SIGNED_IN') {
                    syncUserProfile(session.user);
                } else if (event === 'SIGNED_OUT') {
                    syncUserProfile(null);
                }
            }
        );

        // Check for an initial session on page load.
        // This handles the case where the user is already logged in.
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                syncUserProfile(session.user);
            }
        });

        // Cleanup the listener when the component is unmounted.
        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    const value = {
        user: userProfile,
        setUser: setUserProfile,
    };

    return (
        <UserDetailContext.Provider value={value}>
            {children}
        </UserDetailContext.Provider>
    );
};

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserDetailContext.Provider");
    }
    return context;
};