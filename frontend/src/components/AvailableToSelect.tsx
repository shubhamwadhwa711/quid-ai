import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvailableTo } from "@/reducers/filter/availableto/availabletoSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Option {
  id: number;
  name: string;
}

interface MultiSelectProps {
  defaultSelected: Option[];
  onChange: (selected: Option[]) => void;
}

export const AvailableTo: React.FC<MultiSelectProps> = ({
  defaultSelected,
  onChange,
}) => {
  const dispatch = useAppDispatch();
  const { availableTo: availableOptions, loading } = useAppSelector(
    (state) => state.AvailableTo
  );

  const [selectedItems, setSelectedItems] = useState<Option[]>(defaultSelected || []);

  useEffect(() => {
    dispatch(fetchAvailableTo());
  }, [dispatch]);

  const handleToggle = (option: Option) => {
    let updated: Option[];

    const exists = selectedItems.some((item) => item.id === option.id);

    if (exists) {
      updated = selectedItems.filter((item) => item.id !== option.id);
    } else {
      updated = [...selectedItems, option];
    }

    setSelectedItems(updated);
    onChange(updated);
  };

  if (loading) return <p className="text-gray-400 text-center py-4">Loading options...</p>;

  return (
    <div className="space-y-4">
      <div className="mt-2 space-y-2">
        {availableOptions?.map((option: Option) => {
          const checked = selectedItems.some((item) => item.id === option.id);
          return (
            <div 
              key={option.id} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                checked 
                  ? 'bg-gradient-to-r from-[#2A2A4A] to-[#1E1E38] border border-[#7C2BD3]' 
                  : 'bg-[#1E1E38] hover:bg-[#2A2A4A] border border-[#3A3A5A]'
              }`}
              onClick={() => handleToggle(option)}
            >
              <Checkbox
                id={`option-${option.id}`}
                checked={checked}
                onCheckedChange={() => handleToggle(option)}
                className="border-[#7C2BD3]"
              />
              <Label 
                htmlFor={`option-${option.id}`}
                className="text-white font-medium cursor-pointer flex-1"
              >
                {option.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
