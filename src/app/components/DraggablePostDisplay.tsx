import { Draggable } from "@hello-pangea/dnd";
import { BasicPost } from "@/types";

interface DraggablePostDisplayProps {
  post: BasicPost;
  index: number;
}

const DraggablePostDisplay = ({ post, index }: DraggablePostDisplayProps) => {
  return (
    <Draggable draggableId={post.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            flex flex-col items-center justify-center text-center
            rounded-xl border transition-all duration-200
            min-h-[80px] p-4
            ${snapshot.isDragging
              ? 'bg-gradient-to-b from-primary-500 to-primary-600 border-primary-600 shadow-primary text-white'
              : 'bg-white border-neutral-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5'
            }
          `}
          style={{
            ...provided.draggableProps.style,
            cursor: snapshot.isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          <div className={`text-lg font-semibold mb-2 ${snapshot.isDragging ? 'text-white' : 'text-neutral-900'}`}>
            Post #{post.id}
          </div>
          <div className={`text-sm ${snapshot.isDragging ? 'text-white/90' : 'text-neutral-600'}`}>
            ↑ {post.upvotes} ↓ {post.downvotes}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePostDisplay;
