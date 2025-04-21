import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface DraggablePostDisplayProps {
  post: {
    id: number;
    upvotes: number;
    downvotes: number;
  };
  index: number;
}

const DraggablePostDisplay: React.FC<DraggablePostDisplayProps> = ({ post, index }) => {
  return (
    <Draggable draggableId={post.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`border rounded bg-white shadow-sm transition-shadow text-black flex flex-col items-center justify-center text-center p-1 sm:p-2 md:p-2 ${snapshot.isDragging ? "ring-2 ring-blue-500" : ""}`}
          style={{ ...provided.draggableProps.style, color: '#111', backgroundColor: '#fff', minHeight: 36 } }
        >
          <div className="font-bold text-black leading-tight text-base sm:text-lg">Post #{post.id}</div>
          <div className="text-black text-xs sm:text-sm leading-tight mt-1">Upvotes: {post.upvotes} | Downvotes: {post.downvotes}</div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePostDisplay;
