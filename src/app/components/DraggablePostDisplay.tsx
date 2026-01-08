import { Draggable } from "@hello-pangea/dnd";
import { BasicPost } from "@/types";

interface DraggablePostDisplayProps {
  post: BasicPost;
  index: number;
}

const DraggablePostDisplay = ({ post, index }: DraggablePostDisplayProps) => {
  const total = post.upvotes + post.downvotes;
  const percentage = total > 0 ? ((post.upvotes / total) * 100).toFixed(0) : '0';

  return (
    <Draggable draggableId={post.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group relative flex items-center gap-4 p-4 sm:p-5
            rounded-xl border
            transition-[background-color,border-color,box-shadow,opacity] duration-250
            ${snapshot.isDragging
              ? 'bg-electric text-ink border-electric shadow-electric-lg'
              : 'bg-ink-muted border-white/[0.08] hover:border-electric/30 hover:bg-surface-hover'
            }
          `}
          style={{
            ...provided.draggableProps.style,
            cursor: snapshot.isDragging ? "grabbing" : "grab",
            userSelect: "none",
            zIndex: snapshot.isDragging ? 1000 : 'auto',
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform || ''} scale(1.02)`.trim()
              : provided.draggableProps.style?.transform,
          }}
        >
          {/* Rank indicator */}
          <div
            className={`
              flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
              font-mono text-sm font-bold transition-colors duration-250
              ${snapshot.isDragging
                ? 'bg-ink/20 text-ink'
                : 'bg-white/[0.05] text-stone'
              }
            `}
          >
            {index + 1}
          </div>

          {/* Drag handle visual */}
          <div
            className={`
              flex-shrink-0 flex flex-col gap-1 transition-colors duration-250
              ${snapshot.isDragging ? 'text-ink/40' : 'text-white/20 group-hover:text-electric/50'}
            `}
          >
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </div>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </div>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-current" />
              <span className="w-1 h-1 rounded-full bg-current" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div
              className={`
                font-display text-lg font-semibold tracking-tight transition-colors duration-250
                ${snapshot.isDragging ? 'text-ink' : 'text-ivory'}
              `}
            >
              Post #{post.id}
            </div>
          </div>

          {/* Vote Stats */}
          <div className="grid items-center gap-x-3 gap-y-2 sm:gap-x-4 grid-cols-[auto,2.5rem,auto,2.5rem,6.5rem]">
            {/* Upvotes */}
            <svg
              className={`w-4 h-4 transition-colors duration-250 ${
                snapshot.isDragging ? 'text-ink/60' : 'text-success'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            <span
              className={`
                inline-block w-10 text-right tabular-nums font-mono text-sm font-semibold transition-colors duration-250
                ${snapshot.isDragging ? 'text-ink/80' : 'text-ivory'}
              `}
            >
              {post.upvotes}
            </span>

            {/* Downvotes */}
            <svg
              className={`w-4 h-4 transition-colors duration-250 ${
                snapshot.isDragging ? 'text-ink/60' : 'text-error'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <span
              className={`
                inline-block w-10 text-right tabular-nums font-mono text-sm font-semibold transition-colors duration-250
                ${snapshot.isDragging ? 'text-ink/80' : 'text-ivory'}
              `}
            >
              {post.downvotes}
            </span>

            {/* Percentage badge */}
            <div
              className={`
                hidden sm:flex items-center justify-end gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold w-[6.5rem]
                transition-all duration-250
                ${snapshot.isDragging
                  ? 'bg-ink/20 text-ink'
                  : 'bg-white/[0.05] text-stone'
                }
              `}
            >
              {percentage}%
              <span className="opacity-60">({total})</span>
            </div>
          </div>

          {/* Active drag indicator */}
          {snapshot.isDragging && (
            <div className="absolute inset-0 rounded-xl ring-2 ring-electric ring-offset-2 ring-offset-ink pointer-events-none" />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggablePostDisplay;
