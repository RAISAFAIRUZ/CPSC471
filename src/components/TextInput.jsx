
/**
 * 
 * @param {string} title
 * @param {string} value
 * @param {string} name 
 * @param {Function} onChange
 * @param {boolean} required
 * @param {string} type
 * @param {ReactNode} icon
 * @returns 
 */
export default function TextInput({
  title, value, name, onChange, required, type, icon, error, errorMessage
}) {
  return (
    <>
      <label className="text-lg font-black uppercase font-montserrat">{title}</label>
      <div className="flex flex-row space-x-2">
        <div className="w-full h-full rounded-md">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`
              w-full rounded-md border px-2 text-lg
              outline 
              outline-3 outline-offset-[3px]
              text-zinc-100
              bg-zinc-800
              focus:outline-zinc-500 focus:bg-secondary-shade-2
              ${error ? "border-red-400 outline-red-400" : "border-zinc-800 outline-zinc-800"}
            `}
          />
        </div>
        {icon ? icon : null}
        {required ?
          <span className="text-red-500 px-2">*</span>
          : null}
      </div>
      { error ? 
        <>
          <span>
            {errorMessage ?? "Please fill in field."}
          </span>
        </>
      : null}
    </>
  )
}