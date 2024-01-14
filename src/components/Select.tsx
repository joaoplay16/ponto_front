type SelectProps = {
  title: string
  values: (string | number)[],
  defaultValue?: (string | number)
  onSelect: (selected: string | number) => void
  transformValue?: (value: string | number) => string | number;
}

const Select = ({ title, values, defaultValue, onSelect, transformValue = (value) => value }: SelectProps) => {
  return (
    <select
      className="block w-28 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      onChange={(e) => onSelect(e.target.value as string | number)} defaultValue={defaultValue}>
      <option value="" disabled selected>
       {title}
      </option>
      {values.map((value) => (
        <option key={value} value={value}>
          {transformValue(value)}
        </option>
      ))}
    </select>
  )
}

export default Select
