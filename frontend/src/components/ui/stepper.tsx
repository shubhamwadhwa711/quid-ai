import React from "react";
import { motion} from "framer-motion";

export interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  orientation?: "left" | "right";
  index?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isLast?: boolean;
  children?: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({
  title,
  description,
  icon,
  orientation = "left",
  index = 0,
  isActive = false,
  isCompleted = false,
  isLast = false,
  children,
}) => {
  return children;
};

interface StepperProps {
  children: React.ReactElement<StepProps> | React.ReactElement<StepProps>[];
  current?: number;
  defaultOrientation?: "left" | "right";
}

export const Stepper: React.FC<StepperProps> = ({
  children,
  current = 0,
  defaultOrientation = "left",
}) => {
  // Convert children to array even if there's only one child
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<StepProps>[];

  // Extract props from each Step child
  const steps = childrenArray
    .map((child, index) => {
      // Make sure the child is a Step component
      if (child.type !== Step) {
        console.warn(
          "VerticalStepper only accepts Step components as children"
        );
        return null;
      }

      const orientation = child.props.orientation || defaultOrientation;

      // Calculate step status based on current step
      const isActive = index === current;
      const isCompleted = index < current;
      const isLast = index === childrenArray.length - 1;

      return {
        ...child.props,
        index,
        orientation,
        isActive,
        isCompleted,
        isLast,
      };
    })
    .filter(Boolean);

  return (
    <div className="relative w-full">
      {steps.map((step, index) => {
        const isIconLeft = step?.orientation === "left";

        return (
          <div key={index} className="flex items-start gap-4 mb-8">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: isIconLeft ? -20 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex-1"
            >
              {isIconLeft ? (
                <div className="flex justify-end pr-4">{step.icon}</div>
              ) : (
                <div className="text-right pr-4">
                  <h3 className="font-medium text-lg">{step?.title}</h3>
                  <p className="font-[400] text-gray-400 text-sm mt-1">
                    {step?.description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Center Step Indicator */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.3, delay: 0.15 * index }}
            >
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full z-10
                  ${
                    step?.isCompleted
                      ? "bg-green-500 text-white"
                      : step?.isActive
                      ? "bg-[#425BFF] text-white font-bold"
                      : "bg-gray-200 text-gray-600"
                  }
                `}
              >
                {step?.index! + 1}
              </div>

              {/* Connector Line */}
              {!step?.isLast && (
                <motion.div
                  className="w-0.5 bg-gray-200 absolute top-8 h-24"
                  initial={{ scaleY: 0, originY: "top" }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.2 * index }}
                />
              )}
            </motion.div>

            {/* Right Side */}
            <motion.div
              initial={{ opacity: 0, x: !isIconLeft ? 20 : 0 }}
              whileInView={{ opacity: 1, x: !isIconLeft ? 20 : 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex-1"
            >
              {!isIconLeft ? (
                <div className="flex justify-start pl-4">{step?.icon}</div>
              ) : (
                <div className="text-left pl-4">
                  <h3 className="font-medium text-lg">{step.title}</h3>
                  <p className="font-[400] text-gray-400 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
