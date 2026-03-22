
type DefaultFilters = {
    [key: string]: string[]
}

export const defaultFilters: DefaultFilters = {
  "Category A": ["VC-backend project"],
  "Category B": ["Remote"],
  "Category C": ["Rust"],
  "Category D": ["Part-time DAO"],
  "Category E": ["Label"],
  "Category F": ["Beginner friendly"]
};

export type OptionSelectedType = { [category: string]: string[]; };