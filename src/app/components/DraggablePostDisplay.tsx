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
            rounded-xl border
            min-h-[80px] p-4
            ${snapshot.isDragging
              ? 'bg-electric border-electric shadow-electric-lg text-ink'
              : 'bg-ink-muted border-white/[0.08] shadow-sm hover:shadow-md hover:border-electric/30'
            }
          `}
          style={{
            ...provided.draggableProps.style,
            cursor: snapshot.isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          <div className={`font-display text-lg font-semibold mb-2 ${snapshot.isDragging ? 'text-ink' : 'text-ivory'}`}>
            Post #{post.id}
          </div>
          <div className={`text-sm font-mono ${snapshot.isDragging ? 'text-ink/70' : 'text-stone'}`}>
            ↑ {post.upvotes} ↓ {post.downvotes}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePostDisplay;
