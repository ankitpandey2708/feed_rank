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
          style={{
            ...provided.draggableProps.style,
            padding: "var(--space-4)",
            backgroundColor: snapshot.isDragging ? "var(--color-primary)" : "var(--background)",
            border: `1px solid ${snapshot.isDragging ? "var(--color-primary)" : "var(--color-gray-200)"}`,
            borderRadius: "var(--radius-md)",
            boxShadow: snapshot.isDragging ? "var(--shadow-lg)" : "var(--shadow-sm)",
            transition: "all 0.2s ease",
            cursor: "grab",
            userSelect: "none",
            minHeight: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: snapshot.isDragging ? "#ffffff" : "var(--foreground)",
          }}
        >
          <div
            style={{
              fontSize: "var(--text-lg)",
              fontWeight: "600",
              lineHeight: "1.4",
              marginBottom: "var(--space-2)",
              color: "inherit"
            }}
          >
            Post #{post.id}
          </div>
          <div
            style={{
              fontSize: "var(--text-sm)",
              color: snapshot.isDragging ? "#ffffff" : "var(--color-gray-500)",
              lineHeight: "1.5"
            }}
          >
            ↑ {post.upvotes} ↓ {post.downvotes}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePostDisplay;
