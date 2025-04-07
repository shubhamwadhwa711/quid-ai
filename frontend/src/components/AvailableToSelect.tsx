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
  const { availableto: availableOptions, loading } = useAppSelector(
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

  if (loading) return <p>Loading options...</p>;

  return (
    <div className="grid grid-cols-2 gap-2">
      {availableOptions?.map((option: Option) => {
        const checked = selectedItems.some((item) => item.id === option.id);
        return (
          <div key={option.id} className="flex items-center gap-2">
            <Checkbox
              id={`option-${option.id}`}
              checked={checked}
              onCheckedChange={() => handleToggle(option)}
            />
            <Label htmlFor={`option-${option.id}`}>{option.name}</Label>
          </div>
        );
      })}
    </div>
  );
};
