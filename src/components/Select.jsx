import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Select = ({ data, id, value, onChange }) => {
  return (
    <ShadcnSelect onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Please Select Type" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};

export default Select;
