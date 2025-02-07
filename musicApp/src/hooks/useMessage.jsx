import {useEffect, useState} from "react";
import {eventEmitter} from "../App.jsx";

export const useMessage = () => {
    const [messages, setMessages] = useState([]);
    const addMessage = ({type, content, duration}) => {
        let id = Date.now();
        setMessages(prev => ([...prev, {type, content, duration, id}]))
    }

    const removeMessage = (id) => {
        setMessages(prev => (prev.filter(v => v.id !== id)))
    }
    useEffect(() => {
        eventEmitter.on("message", addMessage);
        return () => {
            eventEmitter.off("message", addMessage);
        }
    }, []);

    return {
        addMessage, messages, removeMessage
    }
}


export const MessageContainer = () => {
    const {messages, removeMessage} = useMessage();
    return (
        <div className={"w-[100%] fixed top-0 left-0 flex items-center justify-center p-5 pointer-events-none"}>
            {messages.map((v, i) => (
                <Message key={v.id} message={v} onClose={() => removeMessage(v.id)}></Message>
            ))}
        </div>
    )
}

export const Message = ({message, onClose}) => {
    const [vis, setVis] = useState(true);
    useEffect(() => {
        let a = setTimeout(() => {
            setVis(false);
            setTimeout(() => {
                onClose()
            }, 500)
        }, message.duration);
        return () => {
            clearTimeout(a);
        }
    }, [message.content, message.duration]);

    return (
        <div className={`alert-${message.type} absolute ${vis?"show-toast":"hide-toast  "}`}>
            {message.content}
        </div>
    )
}