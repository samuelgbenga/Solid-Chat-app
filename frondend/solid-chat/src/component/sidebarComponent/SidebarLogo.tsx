import React from 'react'
import { TONE_COLORS } from "../../constant/color";


const SidebarLogo = () => {
  return (
    <div className="flex flex-row h-30 w-30 overflow-hidden self-center flex-">
    <span className="h-10 w-10 object-cover">😆</span>
    <div className="ml-2 text-2xl font-semibold self-center" style={{ color: TONE_COLORS.PRIMARY }}>Solid Chat</div>
</div>
  )
}

export default SidebarLogo