import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

function Room() {
  const { roomid } = useParams();
  const m = useRef(null);
  const [stack, setStack] = useState([]);
  const socket = useSelector((e) => e.socket.socket);

  function handleSend() {
    const message = m.current.value;
    socket.emit("all", { message });
  }

  useEffect(() => {
    setTimeout(() => {
      socket.on("sentall", handleReceiveMessage);
    }, [2000]);
  }, [socket]);

  function handleReceiveMessage(data) {
    const { message } = data;
    setStack(stack.push(message));
    console.log(stack);
  }

  return (
    <div className="relative w-full h-screen text-white bg-gray-900">
      <div className="pt-10 text-center">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold"
        >
          Room Page
        </motion.h1>
        <div className="">
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.96 }}
            className="absolute bottom-4 left-[82vw] p-2 rounded-lg sm:left-[95vw] bg-slate-400"
          >
            Send
          </motion.button>
        </div>
        <div className="">
          <input
            ref={m}
            type="text"
            className="absolute font-bold tracking-widest  bottom-4 text-black px-3 rounded-xl w-[80vw] sm:w-[94vw]  left-0 h-[6vh]  "
          />
        </div>
        <div className="p-2 bg-sky-600 absolute bottom-[10vh]"></div>
      </div>
    </div>
  );
}

export default Room;
