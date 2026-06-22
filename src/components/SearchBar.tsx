interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-[#333] px-4 py-4">
      <span className="text-lg text-[#9ca3af]" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search.."
        aria-label="Buscar por número de orden"
        className="flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-[#6b7280]"
      />
    </div>
  )
}
