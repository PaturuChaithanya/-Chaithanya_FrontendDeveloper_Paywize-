import React, { useState, memo, useCallback } from "react";

const commentsData = [
  {
    id: 1,
    text: "Root comment",
    replies: [
      { id: 2, text: "Reply 1", replies: [] },
      { id: 3, text: "Reply 2", replies: [
          { id: 4, text: "Nested reply", replies: [] }
        ] 
      }
    ]
  },
  {
    id: 5,
    text: "Another root comment",
    replies: []
  }
];

const Comment = memo(function Comment({ comment }) {
  const [expanded, setExpanded] = useState(true);

  const toggle = useCallback(() => setExpanded((prev) => !prev), []);

  return (
    <div style={{ marginLeft: 20, marginTop: 8 }}>
      <div>
        {comment.text}{" "}
        {comment.replies.length > 0 && (
          <button onClick={toggle}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>

      {expanded &&
        comment.replies.map((c) => (
          <Comment key={c.id} comment={c} />
        ))}
    </div>
  );
});


export default function CommentTree() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      {commentsData.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}
