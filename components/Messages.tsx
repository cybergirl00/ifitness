'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const Messages = ({ email }: { email: []}) => {
    const [reply, setReply] = useState('')
    const sendReply  = async () => {}
  return (
    <div>

        <div className="bg-red-100 p-7 w-fit rounded-md shadow-lg rounded-bl-md">
            <h2 className='text-lg font-light'>{email?.message}</h2>
        </div>

        <div className="p-7 bottom-0">
        <div className="flex w-full  items-center gap-3">
      <Input type="text" placeholder="Send message..." 
      onChange={(e) => setReply(e.target.value)}
      />
      <Button type="submit" onClick={sendReply}>Send</Button>
    </div>
        </div>
    </div>
  )
}

export default Messages