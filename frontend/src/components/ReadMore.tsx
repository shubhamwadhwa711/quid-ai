import { useState } from "react";

const ReadMore = ({
  text = "",
  maxLength = 200,
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // Check if the text needs to be truncated
  const needsTruncation = text.length > maxLength;
  // Get the display text
  const displayText = isExpanded ? text : text.slice(0, maxLength);
  return (
    <div className=" space-y-1">
      <p>
        {displayText}
        {!isExpanded && needsTruncation && "..."}
      </p>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#425BFF] text-sm font-medium"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMore;
