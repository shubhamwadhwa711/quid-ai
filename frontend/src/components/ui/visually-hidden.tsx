import React from "react"

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> { }

const VisuallyHidden = React.forwardRef<HTMLDivElement, VisuallyHiddenProps>(
    ({ ...props }, ref) => (
        <div
            ref={ref}
            className="sr-only"
            {...props}
        />
    )
)
VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }
