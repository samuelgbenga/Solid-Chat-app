import React from 'react'

import { UserSchema } from '../../type/schema';
import SidebarLogo from './SidebarLogo';
import UserInfo from './UserInfo';
import PublicChatBtn from './PublicChatBtn';
import ContactList from './ContactList';
import SignoutBtn from './SignoutBtn';

const Sidebar = ({ selectedUser, setSelectedUser }: { selectedUser: UserSchema | null, setSelectedUser: (user: UserSchema) => void }) => {
  return (
    <div className="flex flex-col p-5 w-72 flex-shrink-0 justify-between">
        <SidebarLogo/>
        <UserInfo/>
        <PublicChatBtn selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <ContactList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <SignoutBtn/>

    </div>
  )
}

export default Sidebar;