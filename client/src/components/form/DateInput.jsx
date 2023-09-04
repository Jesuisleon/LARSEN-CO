export default function DateInput({ date, handleDate, isDateInvalid }) {
  return (
    <div>
      <label htmlFor="date" className="label">
        Date
      </label>
      <input
        type="date"
        id="date"
        name="date"
        className="input"
        defaultValue={date}
        onChange={(e) => {
          handleDate(e.target.value);
        }}
        {...(isDateInvalid && { style: { border: "1px solid red" } })}
      />
      {/* is isDateInvalid set a error message */}
      {isDateInvalid && (
        <p className="text-red-500 text-sm">
          The provisional date cannot be before report date
        </p>
      )}
    </div>
  );
}
